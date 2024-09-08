import express from "express";
import { postLogin, postRegister, refreshToken, updateAccount } from "../controllers/auth";
import { uploadProfile } from "../config/multer";
import { validateData } from "../middlewares/validations";
import { loginSchema, registerSchema, updateAccountSchema } from "../schemas/authSchemas";
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

router.patch(
  "/account",
  isAuth,
  uploadProfile.single("picture"),
  validateData(updateAccountSchema),
  updateAccount
);

export default router;
