import express from "express";
import {
  borrowBook,
  returnBook,
  getLatestBooks,
  findByCategory,
  findByAuthor,
  addRemoveWishlist,
  addCart,
  searchBooks,
  getSettings,
  getNotifications,
  createCheckoutSession,
  addMoney,
  removeCart,
  getHistory,
  getCart,
  getWishlist,
} from "../controllers/users";
import { isAuth } from "../middlewares/is-Auth";
import { isUser } from "../middlewares/is-User";
import { validateData } from "../middlewares/validations";
import {
  addMoneyParamsSchema,
  addMoneyQuerySchema,
  addRemoveWishlistOrCartSchema,
  borrowBooksSchema,
  createCheckoutSessionBodySchema,
  createCheckoutSessionParamsSchema,
  findByAuthorParamsSchema,
  findByCategoryParamsSchema,
  returnBooksSchema,
  searchBooksParamsSchema,
} from "../schemas/userSchemas";

const router = express.Router();

/* /api/users */

router.get(
  "/findCategory/:category",
  isAuth,
  validateData(findByCategoryParamsSchema, "params"),
  findByCategory
);
router.get(
  "/findAuthor/:author",
  isAuth,
  validateData(findByAuthorParamsSchema, "params"),
  findByAuthor
);
router.get("/settings", isAuth, getSettings);

router.get("/notifications", isAuth, isUser, getNotifications);
router.get("/history", isAuth, isUser, getHistory);
router.get("/cart", isAuth, isUser, getCart);
router.get("/wishlist", isAuth, isUser, getWishlist);
router.get(
  "/:bookTitle",
  isAuth,
  validateData(searchBooksParamsSchema, "params"),
  searchBooks
);
router.get("/", isAuth, getLatestBooks);
router.get(
  "/createCheckoutSession/:price",
  isAuth,
  isUser,
  validateData(createCheckoutSessionParamsSchema, "params"),
  validateData(createCheckoutSessionBodySchema, "body"),
  createCheckoutSession
);
router.get(
  "/addMoney/:userId",
  validateData(addMoneyParamsSchema, "params"),
  validateData(addMoneyQuerySchema, "query"),
  addMoney
);

router.post(
  "/wishlist",
  isAuth,
  isUser,
  validateData(addRemoveWishlistOrCartSchema, "body"),
  addRemoveWishlist
);
router.post(
  "/addCart",
  isAuth,
  isUser,
  validateData(addRemoveWishlistOrCartSchema, "body"),
  addCart
);
router.post(
  "/removeCart",
  isAuth,
  isUser,
  validateData(addRemoveWishlistOrCartSchema, "body"),
  removeCart
);
router.post(
  "/borrow",
  isAuth,
  isUser,
  validateData(borrowBooksSchema, "body"),
  borrowBook
);

router.patch(
  "/return",
  isAuth,
  isUser,
  validateData(returnBooksSchema, "body"),
  returnBook
);

export default router;
