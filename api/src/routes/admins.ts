import express from "express";
import {
  addAdmin,
  addBook,
  addCopies,
  updateBook,
} from "../controllers/admins";
import { isAdmin } from "../middlewares/is-Admin";
import { isSuperAdmin } from "../middlewares/is-Super-Admin";
import { uploadBook } from "../config/multer";
const router = express.Router();

/* api//admins */
router.post("/addBook", isAdmin, uploadBook.single("picture"), addBook);

router.patch("/addCopies/:bookId", isAdmin, addCopies);

router.patch(
  "/book/:bookId",
  isAdmin,
  uploadBook.single("picture"),
  updateBook
);

router.post("/addAdmin", isSuperAdmin, addAdmin);

export default router;
