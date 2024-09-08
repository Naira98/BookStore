import express from "express";
import { postLogin, postRegister, refreshToken } from "../controllers/auth";
import { uploadProfile } from "../config/multer";

const router = express.Router();

/* /api/auth */
router.post("/register", uploadProfile.single("picture"), postRegister);

router.post("/login", postLogin);

router.post("/refresh", refreshToken);

export default router;
