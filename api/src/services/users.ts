import {
  authors,
  books,
  borrow_books,
  borrows,
  carts,
  categories,
  db,
  deliveries,
  notifications,
  returns,
  settings,
  stripe_sessions,
  users,
  wishlists,
} from "./db";
import { stripe } from "../lib/stripe";
import { findUserBy } from "./auth";
import { NotFound } from "../lib/error";
import {
  EPaymentMethod,
  IBook,
  IBorrowBook,
  INotification,
  IUser,
} from "../types/db_types";
import { Knex } from "knex";
import { calcCartPrices } from "../lib/cartPrices";
import { calcStartEndDates } from "../lib/calcStartEndDate";

export const findBookById = async (id: number) => {
  const [book] = await books().select("*").where({ id });
  return book;
};

export const findLatestBooksApi = async () => {
  return await books().select("*").orderBy("created_at", "desc").limit(4);
};

export const findBooksByTitle = async (title: string) => {
  return await books().select("*").where("title", "ilike", `%${title}%`);
};

export const findBooksByCategoryApi = async (category: string) => {
  const returnCategory = await categories()
    .select("id")
    .where("name", "ilike", `%${category}%`);
  if (!returnCategory.length) return [];
  return await books().select("*").where({ category_id: returnCategory[0].id });
};

export const findBooksByAuthorApi = async (author: string) => {
  const returnAuthor = await authors()
    .select("id")
    .where("name", "ilike", `%${author}%`);
  if (!returnAuthor.length) return [];
  return await books().select("*").where({ author_id: returnAuthor[0].id });
};

export const getCartApi = async (user_id: number) => {
  const cart = await carts()
    .select("*")
    .where({ user_id })
    .join<IBook>("books", "carts.book_id", "books.id");
  return cart;
};
export const getWishlistApi = async (user_id: number) => {
  const wishlist = await wishlists()
    .select("*")
    .where({ user_id })
    .join<IBook>("books", "wishlists.book_id", "books.id");
  return wishlist;
};

export const addRemoveWishlistApi = async (
  user_id: number,
  book_id: number
) => {
  const [id] = await wishlists().select("id").where({ user_id, book_id });
  if (id?.id) {
    await wishlists().delete().where({ id: id.id });
    return { deleted: true };
  } else {
    const [data] = await wishlists()
      .insert({ user_id, book_id })
      .returning("*");
    return data;
  }
};
export const addCartApi = async (user_id: number, book_id: number) => {
  const [id] = await carts().select("id").where({ user_id, book_id });
  if (id?.id) {
    const [data] = await carts()
      .increment("quantity", 1)
      .update({ updated_at: new Date() })
      .where({ id: id.id })
      .returning("*");
    return data;
  } else {
    const [data] = await carts().insert({ user_id, book_id }).returning("*");
    return data;
  }
};
export const removeCartApi = async (user_id: number, book_id: number) => {
  await carts().delete().where({ user_id, book_id });
  return { deleted: true };
};

export const addMoney = async (user_id: number, amount: number) => {};

export const borrowApi = async () => {};

export const getSettingsApi = async (trx?: Knex.Transaction) => {
  const query = settings().select("*").where({ id: 1 });
  if (trx) query.transacting(trx);
  const [data] = await query;
  return data;
};

export const getNotificationsApi = async (user_id: number) => {
  const data = await notifications()
    .select("*")
    .where({ user_id })
    .orderBy("created_at", "desc")
    .limit(5);
  return data;
};

export const addSessionIdApi = async (user_id: number, session_id: string) => {
  const [data] = await stripe_sessions()
    .insert({ user_id, session_id })
    .returning("*");
  return data;
};

export const deleteSessionIdApi = async (
  user_id: number,
  session_id: string
) => {
  const [data] = await stripe_sessions()
    .delete()
    .where({ user_id, session_id })
    .returning("*");
  return data;
};

export const handleStripeSessions = async (user_id: number) => {
  await db.transaction(async (trx) => {
    const sessions = await stripe_sessions()
      .select({ id: "session_id" })
      .where({ user_id })
      .transacting(trx);

    for (const { id } of sessions) {
      const stripe_session = await stripe.checkout.sessions.retrieve(id);

      if (stripe_session.payment_status == "paid") {
        // handle paid session
        await stripe_sessions()
          .delete()
          .where({ user_id, session_id: id })
          .transacting(trx);

        if (!stripe_session.amount_total) {
          console.error("No amount_total in stripe session", id);
          continue;
        }

        await users()
          .increment("wallet", stripe_session.amount_total / 100)
          .where({ id: user_id })
          .transacting(trx);
      } else {
        if (stripe_session.created * 1000 < Date.now() - 1000 * 60 * 60 * 24) {
          // handle expired session
          await stripe_sessions()
            .delete()
            .where({ user_id, session_id: id })
            .transacting(trx);
        }
      }
    }
  });
};

export const borrowRequest = async (
  user_id: number,
  payment_method: EPaymentMethod,
  borrow_method: "pick_up" | "delivery",
  address?: string
) => {
  return await db.transaction(async (trx) => {
    /* Get Cart */
    const cart = await carts()
      .select("*")
      .where({ user_id })
      .join<IBook>("books", "carts.book_id", "books.id")
      .transacting(trx);

    if (!cart.length) throw new NotFound("Cart is empty");

    /* Get User */
    const user = await findUserBy("id", user_id, trx);
    if (!user) throw new NotFound("User not found");

    /* Get Settings */
    const { delivery_fees: delivery_fees_settings, free_delivery_fees } =
      await getSettingsApi(trx);

    /* Calculate Total */
    let { total, sub_total, delivery_fees } = calcCartPrices(
      cart,
      free_delivery_fees,
      delivery_fees_settings,
      borrow_method
    );

    /* Borrow Status */
    const borrow_status =
      borrow_method == "pick_up"
        ? "wait_for_pickup_approval"
        : "not_delivered_yet";

    /* Money */
    if (payment_method == "wallet") {
      if (user.wallet < total)
        throw new Error(`Not enough money in wallet. You need ${total} EGP`);

      await users()
        .decrement("wallet", total)
        .where({ id: user_id })
        .transacting(trx);

      await addNotification(
        user_id,
        `You have paid ${total} EGP from your wallet for borrowing ${cart.length} books`,
        "wallet_payment_approved",
        trx
      );
    }

    /* Create Borrow */
    const [borrow] = await borrows()
      .insert({
        user_id,
        sub_total,
        is_paid: payment_method == "wallet",
        payment_method,
      })
      .returning("*")
      .transacting(trx);

    /* Create Borrow_Books */
    await borrow_books()
      .insert(
        cart.map((c) => ({
          borrow_id: borrow.id,
          book_id: c.book_id,
          return_id: null,
          borrow_fees: c.borrow_fees,
          deposit: c.deposit,
          quantity: c.quantity,
          start_date: null,
          return_date: null,
        }))
      )
      .transacting(trx);

    if (borrow_status == "wait_for_pickup_approval") {
      await addNotification(
        user_id,
        `You have created a borrow order for ${cart.length} books, waiting for pickup approval`,
        "wait_for_pickup_approval",
        trx
      );
    } else if (borrow_status == "not_delivered_yet") {
      await deliveries()
        .insert({
          user_id,
          delivery_task: "borrow",
          borrow_id: borrow.id,
          address,
          delivery_fees,
          order_status: "not_delivered_yet",
        })
        .transacting(trx);

      await addNotification(
        user_id,
        `Borrow Delivery order created successfully for ${cart.length} books`,
        "borrow_delivery_created",
        trx
      );
    }

    /* Empty Cart */
    await carts().delete().where({ user_id }).transacting(trx);

    return borrow;
  });
};

export const returnRequest = async (
  borrow_book_ids: number[],
  user_id: number,
  return_method: "drop_off" | "delivery",
  address: string
) => {
  return await db.transaction(async (trx) => {
    /* Return request */
    const [{ id: return_id }] = await returns()
      .insert({ user_id })
      .returning("id")
      .transacting(trx);

    /* Add return_id to books */
    await borrow_books()
      .update({ return_id, updated_at: new Date() })
      .whereIn("id", borrow_book_ids);

    /* Get Settings */
    const { delivery_fees } = await getSettingsApi(trx);

    if (return_method == "drop_off") {
      await borrow_books()
        .update({
          borrow_status: "wait_for_return_approval",
          updated_at: new Date(),
        })
        .whereIn("id", borrow_book_ids);

      await addNotification(
        user_id,
        `You have created a return order for ${borrow_book_ids.length} books, waiting for return approval`,
        "wait_for_return_approval",
        trx
      );
    } else if (return_method == "delivery") {
      await borrow_books()
        .update({
          borrow_status: "return_delivery_created",
          updated_at: new Date(),
        })
        .whereIn("id", borrow_book_ids);

      await deliveries()
        .insert({
          user_id,
          delivery_task: "return",
          return_id: return_id,
          address,
          delivery_fees,
          order_status: "not_delivered_yet",
        })
        .transacting(trx);

      await addNotification(
        user_id,
        `Return Delivery order created successfully for ${borrow_book_ids.length} books`,
        "return_delivery_created",
        trx
      );
      return return_id;
    }
  });
};

export const getHistoryApi = async (user_id: number) => {
  return await borrows()
    .where({ user_id })
    .select("*")
    .join<IBorrowBook>("borrow_books", "borrows.id", "borrow_books.borrow_id")
    .join<IBook>("books", "borrow_books.book_id", "books.id");
  // .orderBy("created_at", "desc")
};

// if (borrow_status == "picked_up") {
//   await reduceCopiesInStock(borrow.id, trx);
//   await addNotification(
//     user_id,
//     "Borrow order started",
//     "borrow_started",
//     trx
//   );
// } else

// reduce copies in stock
// after admin cash approval,
// after borrow delivery on the way,
// after wallet payment and pick up

// cash approval: update start date, end date, status, is_paid, notification to user
// delivery: update delivery status, notification to user

async function addNotification(
  user_id: INotification["user_id"],
  notification: INotification["notification"],
  status: INotification["status"],
  trx?: Knex.Transaction
) {
  const query = notifications().insert({
    user_id,
    notification,
    status,
    seen: false,
  });
  if (trx) query.transacting(trx);
  await query;
}

async function reduceCopiesInStock(borrow_id: number, trx: Knex.Transaction) {
  // get books_ids from borrow_books
  const cart_books = await borrow_books()
    .select(["book_id", "quantity"])
    .where({ borrow_id })
    .transacting(trx);

  // reduce copies in stock
  for (const book of cart_books) {
    await books()
      .decrement("copies_in_stock", book.quantity)
      .where({ id: book.book_id })
      .transacting(trx);
  }
}
