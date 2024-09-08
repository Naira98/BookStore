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
import { validateData } from "../middlewares/validations";
import {
  addBookSchema,
  addCopiesSchema,
  updateBookShema,
} from "../schemas/adminSchemas";
import { registerSchema } from "../schemas/authSchemas";
import { isAuth } from "../middlewares/is-Auth";
const router = express.Router();

/* api//admins */
router.post(
  "/addBook",
  isAuth,
  isAdmin,
  uploadBook.single("picture"),
  validateData(addBookSchema),
  addBook
);

router.patch(
  "/addCopies/:bookId",
  isAuth,
  isAdmin,
  validateData(addCopiesSchema),
  addCopies
);

router.patch(
  "/book/:bookId",
  isAuth,
  isAdmin,
  uploadBook.single("picture"),
  validateData(updateBookShema),
  updateBook
);

router.post(
  "/addAdmin",
  isAuth,
  isSuperAdmin,
  validateData(registerSchema),
  addAdmin
);

export default router;
