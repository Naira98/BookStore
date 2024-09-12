import express from "express";
import {
  postLogin,
  postRegister,
  refreshToken,
  getUser,
  updateAccount,
  postLogout,
} from "../controllers/auth";
import { uploadProfile } from "../config/multer";
import { validateData } from "../middlewares/validations";
import {
  loginSchema,
  registerSchema,
  updateAccountSchema,
} from "../schemas/authSchemas";
import { isAuth } from "../middlewares/is-Auth";

const router = express.Router();

/* /api/auth */
router.post(
  "/register",
  uploadProfile.single("picture"),
  validateData(registerSchema),
  postRegister
);

router.post("/login", validateData(loginSchema), postLogin);

router.post("/refresh", refreshToken);

router.get("/user", isAuth,getUser);

router.patch(
  "/account",
  isAuth,
  uploadProfile.single("picture"),
  validateData(updateAccountSchema),
  updateAccount
);

router.post("/logout", isAuth, postLogout);

export default router;
