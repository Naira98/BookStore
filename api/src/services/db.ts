import knex from "knex";
import config from "../config/config";
import {
  IAuthor,
  IBook,
  IBorrowBook,
  IBorrow,
  ICart,
  ICategory,
  INotification,
  ISetting,
  IToken,
  IUser,
  IWishlist,
  IStripeSession,
  IDelivery,
} from "../types/db_types";

export const db = knex({
  client: "pg",
  connection: {
    user: config.postgres.user,
    password: config.postgres.password,
    host: config.postgres.host,
    port: +config.postgres.port,
    database: config.postgres.database,
  },
  searchPath: ["knex", "public"],
});

export const users = () => db<IUser>("users");
export const tokens = () => db<IToken>("tokens");
export const settings = () => db<ISetting>("settings");
export const notifications = () => db<INotification>("notifications");
export const authors = () => db<IAuthor>("authors");
export const categories = () => db<ICategory>("categories");
export const books = () => db<IBook>("books");
export const borrows = () => db<IBorrow>("borrows");
export const returns = () => db<IBorrow>("returns");
export const borrow_books = () => db<IBorrowBook>("borrow_books");
export const deliveries = () => db<IDelivery>("deliveries");
export const wishlists = () => db<IWishlist>("wishlists");
export const carts = () => db<ICart>("carts");
export const stripe_sessions = () => db<IStripeSession>("stripe_sessions");
