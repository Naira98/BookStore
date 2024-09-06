import express from "express";
const router = express.Router();

/* /admins */
router.post("/addBook");
router.post("/addCopies");
router.post("/addAdmin");
router.patch("/book/:bookId");

export default router;
