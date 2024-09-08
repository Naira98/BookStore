import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { differenceInDays, isPast } from "date-fns";
import Stripe from "stripe";

import Book from "../models/Book";
import Borrow, { IBorrowModel } from "../models/Borrow";
import User from "../models/User";
import config from "../config/config";

const stripe = new Stripe(config.stripe.secret);

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

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Transaction */
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const { bookId } = req.params;
      const book = await Book.findById(bookId).session(session);
      if (!book) return res.status(404).json({ message: "Book not found" });

      // check book availablitiy
      if (book.availableCopies <= 0)
        return res
          .status(400)
          .json({ message: `Sorry, ${book.title} book unavailable now!` });

      const user = await User.findById(req.user?.userId).session(session);
      if (!user) return res.status(404).json({ message: "Book not found" });

      // check user wallet
      const bookPrice = book.regularPrice + book.deposit;

      if (user.wallet < bookPrice)
        return res.status(400).json({
          message: `You need ${bookPrice}$ to borrow ${book.title} book`,
        });

      // New borrow
      const newBorrow = new Borrow({
        book: book._id,
        user: user._id,
        regularPrice: book.regularPrice,
        deposit: book.deposit,
        status: "borrowed",
      });

      // Pay money
      user.wallet = user.wallet - bookPrice;

      // Decrease available books
      book.availableCopies = book.availableCopies - 1;

      const [addedBorrow] = await Promise.all([
        await newBorrow.save({ session }),
        await user.save({ session }),
        await book.save({ session }),
      ]);

      return res.status(201).json(addedBorrow);
    });
    session.endSession();
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
    /* Transaction */
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const { borrowId } = req.params;
      const borrow = await Borrow.findById(borrowId).session(session);
      if (!borrow)
        return res.status(404).json({ message: "Borrow Data not found" });

      if (borrow.status !== "borrowed")
        return res.status(400).json({ message: "Book not borrowed" });

      if (borrow.user.toString() !== req.user?.userId)
        return res.status(403).json({ message: "Unauthorized" });

      // Get user Data
      const user = await User.findById(borrow.user).session(session);
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

      // Increase availableBooks
      await Book.findByIdAndUpdate(
        borrow.book,
        { $inc: { availableCopies: 1 } },
        { session }
      );

      // Update borrow data
      borrow.status = "returned";

      const [returnedBook] = await Promise.all([
        await borrow.save({ session }),
        await user.save({ session }),
      ]);
      return res.status(200).json(returnedBook);
    });
    session.endSession();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const YOUR_DOMAIN = "http://localhost:3000";
export const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { price } = req.params;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              name: "Payment to Bookstore wallet",
              description: "hi",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/users/addMoney?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.status(303).json(session);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const addMoney = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req);
  } catch (err) {}
};
