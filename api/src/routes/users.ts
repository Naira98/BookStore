import express from "express";
import {
  borrowBook,
  createCheckoutSession,
  addMoney,
  getHistory,
  findAll,
  findBook,
  returnBook,
} from "../controllers/users";
import { isAuth } from "../middlewares/is-Auth";
import { isUser } from "../middlewares/is-User";

const router = express.Router();

/* /api/users */
router.get("/", isAuth, findAll);

router.get(
  "/createCheckoutSession/:price",
  isAuth,
  isUser,
  createCheckoutSession
);

router.get("/addMoney/:userId", addMoney);

router.get("/history",isAuth, getHistory);

router.get("/:bookId", isAuth, findBook);

router.post("/borrow/:bookId", isAuth, isUser, borrowBook);

router.patch("/return/:borrowId", isAuth, isUser, returnBook);

export default router;
