import express from "express";
import { addAdmin, addBook, addCopies, updateBook } from "../controllers/admins";
import { isAdmin } from "../middlewares/is-Admin";
import { isSuperAdmin } from "../middlewares/is-Super-Admin";
const router = express.Router();

/* /admins */
router.post("/addBook", isAdmin, addBook);
router.patch("/addCopies/:bookId", isAdmin, addCopies);
router.patch("/book/:bookId", isAdmin, updateBook);
router.post("/addAdmin", isSuperAdmin, addAdmin);

export default router;
