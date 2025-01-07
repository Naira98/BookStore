import bcrypt from "bcrypt";
import { asyncHandler } from "../middlewares/asyncHandler";
import { handleUploadPicture } from "../config/cloudinary";
import { BadRequest, NotFound } from "../lib/error";
import parsePhoneNumber from "libphonenumber-js";
import { register } from "../services/auth";
import {
  handleAddBook,
  handleUpdateBook,
  handleUpdateBookAuthor,
  handleUpdateBookCategory,
  handleUpdateSettings,
  handleDeleteBook,
} from "../services/admins";
import { findBookById } from "../services/users";

export const addBook = asyncHandler(async (req, res) => {
  const { picture, cloudinary_public_id } = await handleUploadPicture(req);
  const addedBook = await handleAddBook(
    req.body,
    picture,
    cloudinary_public_id
  );
  return res.status(201).json(addedBook);
});

export const updateBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  if (!bookId) throw new BadRequest("No Book Id");
  const book = await findBookById(+bookId);
  if (!book) throw new NotFound("Book not found");
  const updatedBook = await handleUpdateBook(
    +bookId,
    req,
    book.cloudinary_public_id
  );
  return res.status(200).json(updatedBook);
});

export const updateBookAuthor = asyncHandler(async (req, res) => {
  const updatedBook = await handleUpdateBookAuthor(
    +req.params.bookId,
    req.body.author
  );
  return res.status(200).json(updatedBook);
});

export const updateBookCategory = asyncHandler(async (req, res) => {
  const updatedBook = await handleUpdateBookCategory(
    +req.params.bookId,
    req.body.category
  );
  return res.status(200).json(updatedBook);
});

export const addEmployee = asyncHandler(async (req, res) => {
  const { full_name, email, password, phone, role: reqRole } = req.body;
  const phoneNumber = parsePhoneNumber(phone, "EG");
  if (!phoneNumber?.isValid()) throw new BadRequest("Phone Number incorrect");
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const { picture, cloudinary_public_id } = await handleUploadPicture(req);
  const { id, role } = await register(
    full_name,
    email,
    hashedPassword,
    phoneNumber.number,
    picture,
    cloudinary_public_id,
    reqRole
  );
  return res.status(201).json({
    message: `You've added a/an ${role} successfully`,
    id,
    role,
    cloudinary_public_id,
  });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const updatedSettings = await handleUpdateSettings(req);
  return res.status(200).json(updatedSettings);
});

export const deleteBook = asyncHandler(async (req, res) => {
  await handleDeleteBook(+req.params.bookId);
  return res.status(200).json({ message: "Book deleted successfully" });
});
