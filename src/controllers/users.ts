import { NextFunction, Request, Response } from "express";
import { differenceInDays, isPast } from "date-fns";

import Book from "../models/Book";
import Borrow from "../models/Borrow";
import User from "../models/User";
import mongoose from "mongoose";

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const findBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const addMoney = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // check book availablitiy
    if (book.availableCopies <= 0)
      return res
        .status(400)
        .json({ message: `Sorry, ${book.title} book unavailable now!` });

    // check user wallet
    const bookPrice = book.regularPrice + book.deposit;
    if (req.user?.wallet && req.user?.wallet < bookPrice)
      return res.status(400).json({
        message: `You need ${bookPrice}$ to borrow ${book.title} book`,
      });

    /* Transaction */
    const session = await mongoose.startSession();
    const addedBorrow = await session.withTransaction(async () => {
      // New borrow
      const newBorrow = new Borrow({
        book: book._id,
        user: req.user?._id,
        regularPrice: book.regularPrice,
        deposit: book.deposit,
        status: "borrowed",
      });
      const addedBorrow = await newBorrow.save({ session });

      // Pay money
      await User.findByIdAndUpdate(
        req.user?._id,
        { $inc: { wallet: -bookPrice } },
        { session }
      );

      // Decrease available books
      await Book.findByIdAndUpdate(
        book._id,
        { $inc: { availableCopies: -1 } },
        { session }
      );

      return addedBorrow;
    });
    session.endSession();
    return res.status(201).json(addedBorrow);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { borrowId } = req.params;
    const borrow = await Borrow.findById(borrowId);
    if (!borrow)
      return res.status(404).json({ message: "Borrow Data not found" });

    if (borrow.status !== "borrowed")
      return res.status(400).json({ message: "Book not borrowed" });

    if (borrow.user.toString() !== req.user?._id.toString())
      return res.status(403).json({ message: "Unauthorized" });


    /* Transaction */
    const session = await mongoose.startSession();
    const returned = await session.withTransaction(async () => {

      // Get user Data
      const user = await User.findById(borrow.user);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Calculate delay days
      const isDelay = isPast(borrow.returnDate);
      let delayPrice = 0;
      let fullPrice = borrow.deposit;

      if (isDelay) {
        const delayDays = differenceInDays(Date.now(), borrow.returnDate);
        delayPrice = delayDays * ((borrow.regularPrice * 10) / 100);

        fullPrice = borrow.deposit - delayPrice;

        if (fullPrice < 0 && user.wallet < Math.abs(fullPrice))
          return res.status(412).json({ message: "Insufficient funds" });
      }

      // Return money
      user.wallet = user.wallet + fullPrice;
      await user.save({ session });

      // Increase availableBooks
      await Book.findByIdAndUpdate(
        borrow.book,
        { $inc: { availableCopies: 1 } },
        { session }
      );

      // Update borrow data
      borrow.status = "returned";
      return await borrow.save();
    });
    session.endSession();
    return res.status(201).json(returned);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      user.set(req.body);
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
