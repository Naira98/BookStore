import express from "express";
import { addEmployee, addBook, updateBook } from "../controllers/admins";
import { isAdmin } from "../middlewares/is-Admin";
import { isSuperAdmin } from "../middlewares/is-Super-Admin";
import { upload } from "../config/multer";
import { validateData } from "../middlewares/validations";
import {
  addBookSchema,
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

// (admin) approval for pickup and drop off
// (courier) approval for book return, book delivered and payment

router.post(
  "/addEmployee",
  isAuth,
  isSuperAdmin,
  validateData(addEmployeeSchema),
  addEmployee
);

router.post(
  "/updateSettings",
  isAuth,
  isSuperAdmin,
  validateData(updateSettingsSchema),
  addEmployee
);

export default router;
