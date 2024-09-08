import express from "express";
import { postLogin, postRegister, refreshToken } from "../controllers/auth";
const router = express.Router();

/* /auth */
router.post("/register", postRegister);
router.post("/login", postLogin);
router.post("/refresh", refreshToken);

export default router;
