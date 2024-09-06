import express from "express";
import { postLogin, postLogout, postRegister } from "../controllers/auth";
const router = express.Router();

// /auth/
router.post("/register", postRegister);
router.post("/login", postLogin);
router.post("/logout", postLogout);

export default router;
