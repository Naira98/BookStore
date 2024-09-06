import express from "express";
import {
  addMoney,
  borrowBook,
  findAll,
  findBook,
  returnBook,
  updateAccount,
} from "../controllers/users";
const router = express.Router();

// /users/
router.get("/", findAll);
router.get("/:book", findBook);
router.post("/addMoney", addMoney);
router.post("/borrow", borrowBook);
router.post("/return", returnBook);
router.patch("/account", updateAccount);

export default router;
