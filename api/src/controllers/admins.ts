import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import Book from "../models/Book";
import User from "../models/User";

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      copies,
      regularPrice,
      deposit,
      poster,
      author,
      description,
    } = req.body;

    const book = await Book.findOne({ title: title });
    if (book) {
      return res
        .status(400)
        .json({ message: "Book already exists you can add copies only" });
    }
    const newBook = new Book({
      title,
      copies,
      availableCopies: copies,
      regularPrice,
      deposit,
      poster: poster ? poster : "/assets/books/default-book.jpg",
      author,
      description,
    });
    const addedBook = await newBook.save();
    return res.status(201).json(addedBook);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const addCopies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const { copies } = req.body;

    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        $inc: { copies, availableCopies: copies },
      },
      { returnOriginal: false }
    );
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    book?.set(req.body);
    const updatedBook = await book.save();
    return res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const addAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password, phone, picture } = req.body;
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      picture: picture ? picture : "profiles/default-profile.jpg",
      type: "admin",
    });
    const addedAdmin = await newUser.save();
    return res.status(201).json(addedAdmin);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
