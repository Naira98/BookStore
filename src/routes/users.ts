import express from "express";
import {
  borrowBook,
  createCheckoutSession,
  addMoney,
  findAll,
  findBook,
  returnBook,
  updateAccount,
} from "../controllers/users";
import { isAuth } from "../middlewares/is-Auth";
import { isUser } from "../middlewares/is-User";
const router = express.Router();

/* /users */
router.get("/", isAuth, findAll);
router.get("/create-checkout-session/:price", isAuth, isUser, createCheckoutSession);
router.get('/addMoney', addMoney)
router.get("/:bookId", isAuth, findBook);
router.post("/borrow/:bookId", isAuth, isUser, borrowBook);
router.patch("/return/:borrowId", isAuth, isUser, returnBook);
router.patch("/account", isAuth, isUser, updateAccount);

export default router;
