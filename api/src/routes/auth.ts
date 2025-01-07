import express from "express";
import { upload } from "../config/multer";
import { validateData } from "../middlewares/validations";
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateAccountSchema,
  } from "../schemas/authSchemas";
import { postLogin, postRegister, refreshToken, getUser, updateAccount, postLogout } from "../controllers/auth";
import { isAuth } from "../middlewares/is-Auth";

const router = express.Router();

/* /api/auth */
router.post(
  "/register",
  upload.single("picture"),
  validateData(registerSchema),
  postRegister
);

router.post("/login", validateData(loginSchema), postLogin);

router.post("/refresh", validateData(refreshSchema), refreshToken);

router.get("/user", isAuth, getUser);

router.patch(
  "/account",
  isAuth,
  upload.single("picture"),
  validateData(updateAccountSchema),
  updateAccount
);

router.post("/logout", isAuth, postLogout);

export default router;
