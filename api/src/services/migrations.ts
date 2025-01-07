import { db, settings } from "./db";

async function run() {
  await db.schema.dropTableIfExists("stripe_sessions");
  await db.schema.dropTableIfExists("borrow_books");
  await db.schema.dropTableIfExists("deliveries");
  await db.schema.dropTableIfExists("borrows");
  await db.schema.dropTableIfExists("returns");
  await db.schema.dropTableIfExists("wishlists");
  await db.schema.dropTableIfExists("carts");
  await db.schema.dropTableIfExists("books");
  await db.schema.dropTableIfExists("authors");
  await db.schema.dropTableIfExists("categories");
  await db.schema.dropTableIfExists("notifications");
  await db.schema.dropTableIfExists("tokens");
  await db.schema.dropTableIfExists("users");
  await db.schema.dropTableIfExists("settings");

  await db.schema.createTable("users", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.string("full_name", 100).notNullable();
    table.string("email", 50).unique().notNullable();
    table.string("password", 100).notNullable();
    table.string("phone", 20).notNullable();
    table.decimal("wallet", 10, 2).unsigned().defaultTo(0).notNullable();
    table.string("picture", 500);
    table.string("cloudinary_public_id", 50);
    table
      .enu("role", ["super_admin", "admin", "courier", "user"], {
        useNative: false,
        enumName: "role_type",
      })
      .defaultTo("user")
      .notNullable();
  });

  await db.schema.createTable("tokens", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.integer("user_id").unsigned().unique().notNullable();
    table.foreign("user_id", "fk_user_id_tokens").references("users.id");
    table.string("refresh_token", 500).notNullable();
  });

  await db.schema.createTable("settings", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.integer("borrow_days").unsigned().notNullable();
    table.decimal("delay_fees_per_day", 10, 2).unsigned().notNullable();
    table.decimal("delivery_fees", 10, 2).unsigned().notNullable();
    table.integer("free_delivery_fees").unsigned().notNullable();
  });

  await settings().insert({
    borrow_days: 14,
    delay_fees_per_day: 0.5,
    delivery_fees: 10,
    free_delivery_fees: 100,
  });

  await db.schema.createTable("notifications", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id", "fk_user_id_notifications").references("users.id");
    table.index("user_id", "idx_user_id_notifications");
    table.string("notification", 500).notNullable();
    table.boolean("seen").defaultTo(false).notNullable();
    table
      .enu(
        "status",
        [
          "wait_for_pickup_approval",
          "wallet_payment_approved",
          "wallet_payment_rejected",
          "borrow_started",
          "borrow_delivery_created",
          "borrow_delivery_on_the_way",
          "borrow_delivery_problem",
          "borrow_problem",
          "wait_for_return_approval",
          "return_approved",
          "return_problem",
          "return_delivery_created",
          "return_delivery_problem",
        ],
        {
          useNative: false,
          enumName: "notifications_status_type",
        }
      )
      .notNullable();
  });

  await db.schema.createTable("authors", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.string("name", 100).unique().notNullable();
  });
  await db.schema.createTable("categories", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.string("name", 100).unique().notNullable();
  });
  await db.schema.createTable("books", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.string("title", 100).unique().notNullable();
    table.string("description", 1500);
    table.integer("all_copies").unsigned().notNullable();
    table.integer("copies_in_stock").unsigned().notNullable();
    table.decimal("borrow_fees", 10, 2).unsigned().notNullable();
    table.decimal("deposit", 10, 2).unsigned().notNullable();
    table.string("picture", 500);
    table.string("cloudinary_public_id", 50);
    table.smallint("publish_year").unsigned();
    table.integer("author_id").unsigned().notNullable();
    table.foreign("author_id", "fk_author_id_books").references("authors.id");
    table.integer("category_id").unsigned().notNullable();
    table
      .foreign("category_id", "fk_category_id_books")
      .references("categories.id");
  });
  await db.schema.createTable("borrows", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id", "fk_user_id_borrows").references("users.id");
    table.decimal("sub_total", 10, 2).unsigned().notNullable();
    table.boolean("is_paid").defaultTo(false).notNullable();
    table.enu("payment_method", ["cash", "wallet"], {
      useNative: false,
      enumName: "payment_method_type",
    });
  });

  await db.schema.createTable("returns", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id", "fk_user_id_returns").references("users.id");
  });

  await db.schema.createTable("borrow_books", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.integer("borrow_id").unsigned().notNullable();
    table
      .foreign("borrow_id", "fk_borrow_id_borrow_books")
      .references("borrows.id");
    table.index("borrow_id", "idx_borrow_id_borrow_books");

    table.integer("return_id").unsigned();
    table
      .foreign("return_id", "fk_return_id_borrow_books")
      .references("returns.id");
    table.index("return_id", "idx_return_id_borrow_books");

    table.integer("book_id").unsigned().notNullable();
    table.foreign("book_id", "fk_book_id_borrow_books").references("books.id");

    table.decimal("borrow_fees", 10, 2).unsigned().notNullable();
    table.decimal("deposit", 10, 2).unsigned().notNullable();
    table.integer("quantity").unsigned().notNullable();

    table.date("start_date");
    table.date("return_date");
    table.enu(
      "borrow_status",
      [
        "wait_for_pickup_approval", // add this feature
        "picked_up",
        "not_delivered_yet",
        "delivered",
        "borrow_problem",
        "return_delivery_created",
        "wait_for_return_approval",
        "returned",
        "return_problem",
      ],
      {
        useNative: false,
        enumName: "borrow_status_type",
      }
    );
  });

  await db.schema.createTable("deliveries", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id", "fk_user_id_deliveries").references("users.id");
    table.enu("delivery_task", ["borrow", "return"]);
    table.integer("borrow_id").unsigned();
    table
      .foreign("borrow_id", "fk_borrow_id_deliveries")
      .references("borrows.id");
    table.integer("return_id").unsigned();
    table
      .foreign("return_id", "fk_return_id_deliveries")
      .references("returns.id");
    table.string("address", 500).notNullable();
    table.decimal("delivery_fees", 10, 2).unsigned().notNullable();
    table
      .enu("delivery_status", ["delivered", "not_delivered_yet", "problem"], {
        useNative: false,
        enumName: "delivery_status_type",
      })
      .defaultTo("not_delivered_yet");
  });

  await db.schema.createTable("wishlists", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id", "fk_user_id_wishlist").references("users.id");
    table.index("user_id", "idx_user_id_wishlist");
    table.integer("book_id").unsigned().notNullable();
    table.foreign("book_id", "fk_book_id_wishlist").references("books.id");
  });

  await db.schema.createTable("carts", function (table) {
    table.increments();
    table.timestamps(true, true, false);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id", "fk_user_id_cart").references("users.id");
    table.index("user_id", "idx_user_id_cart");
    table.integer("book_id").unsigned().notNullable();
    table.integer("quantity").unsigned().notNullable().defaultTo(1);
    table.foreign("book_id", "fk_book_id_cart").references("books.id");
  });

  await db.schema.createTable("stripe_sessions", (table) => {
    table.increments();
    table.timestamps(true, true, false);
    table.string("session_id").unique().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id", "fk_user_id_stripe_sessions")
      .references("users.id");
    table.index("user_id", "idx_user_id_stripe_sessions");
  });
}

run().then(() => process.exit());
