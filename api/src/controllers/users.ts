import { asyncHandler } from "../middlewares/asyncHandler";
import {
  addCartApi,
  addRemoveWishlistApi,
  findBooksByTitle,
  findBooksByCategoryApi,
  findBooksByAuthorApi,
  findLatestBooksApi,
  getSettingsApi,
  getNotificationsApi,
  addSessionIdApi,
  handleStripeSessions,
  borrowRequest,
  removeCartApi,
  returnRequest,
  getHistoryApi,
  getCartApi,
  getWishlistApi,
} from "../services/users";
import { BadRequest } from "../lib/error";
import { stripe } from "../lib/stripe";

export const getLatestBooks = asyncHandler(async (req, res) => {
  const books = await findLatestBooksApi();
  return res.status(200).json(books);
});

export const findByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  if (!category) throw new BadRequest("No Category provided");
  const books = await findBooksByCategoryApi(category);
  return res.status(200).json(books);
});

export const findByAuthor = asyncHandler(async (req, res) => {
  const { author } = req.params;
  if (!author) throw new BadRequest("No Author provided");
  const books = await findBooksByAuthorApi(author);
  return res.status(200).json(books);
});

export const addRemoveWishlist = asyncHandler(async (req, res) => {
  const { book_id } = req.body;
  if (!book_id || !req.user?.userId) throw new BadRequest();
  const returnData = await addRemoveWishlistApi(req.user.userId, book_id);
  return res.status(200).json(returnData);
});

export const addCart = asyncHandler(async (req, res) => {
  const { book_id } = req.body;
  if (!book_id || !req.user?.userId)
    throw new BadRequest("No book_id or user_id provided");
  const returnData = await addCartApi(req.user.userId, book_id);
  return res.status(200).json(returnData);
});

export const removeCart = asyncHandler(async (req, res) => {
  const { book_id } = req.body;
  if (!book_id || !req.user?.userId)
    throw new BadRequest("No book_id or user_id provided");
  const returnData = await removeCartApi(req.user.userId, book_id);
  return res.status(200).json(returnData);
});

export const searchBooks = asyncHandler(async (req, res) => {
  let { bookTitle } = req.params;
  const book = await findBooksByTitle(bookTitle);
  return res.status(200).json(book);
});

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getCartApi(req.user?.userId!);
  return res.status(200).json(cart);
});

export const getWishlist = asyncHandler(async (req, res) => {
  const cart = await getWishlistApi(req.user?.userId!);
  return res.status(200).json(cart);
});

export const getHistory = asyncHandler(async (req, res) => {
  const history = await getHistoryApi(req.user?.userId!);
  return res.status(200).json(history);
});

export const borrowBook = asyncHandler(async (req, res) => {
  const { userId } = req.user!;
  const { payment_method, borrow_method, address } = req.body;
  const borrow = await borrowRequest(
    userId,
    payment_method,
    borrow_method,
    address
  );
  return res.status(201).json(borrow);
});
export const returnBook = asyncHandler(async (req, res) => {
  const { borrow_book_ids, return_method, address } = req.body;
  const returnId = await returnRequest(
    borrow_book_ids,
    req.user?.userId!,
    return_method,
    address
  );
  return res.status(201).json({ return_request_id: returnId });
});

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { price } = req.params;
  const { callback_frontend_url } = req.body;

  const host = req.headers.host;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Number(price) * 100,
          product_data: {
            name: "Payment to The Bookshelf wallet",
            description: `Adding $${price} to your Bookshelf wallet`,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://${host}/api/users/addMoney/${req.user?.userId}?amount=${price}&success=true&front_end_url=${callback_frontend_url}`,
    cancel_url: `http://${host}/api/users/addMoney/0?success=false&front_end_url=${callback_frontend_url}`,
  });

  // TODO: add to DB the session.id
  if (!session.url) throw new Error("Can't create stripe session");
  await addSessionIdApi(req.user?.userId!, session.id);

  return res.status(200).json(session.url);
});

export const addMoney = asyncHandler(async (req, res) => {
  const { success, front_end_url } = req.query as {
    success: "true" | "false";
    front_end_url: string;
  };
  const { userId } = req.params;
  if (success == "true") await handleStripeSessions(+userId);
  res.redirect(front_end_url);
});

export const getNotifications = asyncHandler(async (req, res) => {
  const data = await getNotificationsApi(req.user?.userId!);
  return res.status(200).json(data);
});

export const getSettings = asyncHandler(async (req, res) => {
  const data = await getSettingsApi();
  return res.status(200).json(data);
});
