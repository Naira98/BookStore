import express from "express";
import {
  addEmployee,
  addBook,
  updateBook,
  updateBookAuthor,
  updateBookCategory,
  deleteBook,
  updateSettings,
} from "../controllers/admins";
import { isAdmin } from "../middlewares/is-Admin";
import { isSuperAdmin } from "../middlewares/is-Super-Admin";
import { upload } from "../config/multer";
import { validateData } from "../middlewares/validations";
import {
  addBookSchema,
  updateBookAuthorSchema,
  updateBookCategorySchema,
  updateBookShema,
  updateSettingsSchema,
} from "../schemas/adminSchemas";
import { addEmployeeSchema } from "../schemas/authSchemas";
import { isAuth } from "../middlewares/is-Auth";
const router = express.Router();

/* /api/admins */
router.post(
  "/addBook",
  isAuth,
  isAdmin,
  upload.single("picture"),
  validateData(addBookSchema),
  addBook
);

router.patch(
  "/book/:bookId",
  isAuth,
  isAdmin,
  upload.single("picture"),
  validateData(updateBookShema),
  updateBook
);

router.patch(
  "/book/author/:bookId",
  isAuth,
  isAdmin,
  validateData(updateBookAuthorSchema),
  updateBookAuthor
);

router.patch(
  "/book/category/:bookId",
  isAuth,
  isAdmin,
  validateData(updateBookCategorySchema),
  updateBookCategory
);

// (admin) approval for pickup and drop off
// (courier) approval for book return, book delivered and payment

router.post(
  "/addEmployee",
  isAuth,
  isSuperAdmin,
  upload.single("picture"),
  validateData(addEmployeeSchema),
  addEmployee
);

router.patch(
  "/updateSettings",
  isAuth,
  isSuperAdmin,
  validateData(updateSettingsSchema),
  updateSettings
);

router.delete("/:bookId", isAuth, isAdmin, deleteBook);

export default router;
