import bcrypt from "bcrypt";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  handleAddBook,
  handleUpdateBook,
  handleUpdateSettings,
} from "../services/admins";
import { handleUploadPicture } from "../config/cloudinary";
import { findBookBy } from "../services/users";
import { BadRequest, NotFound } from "../lib/error";
import parsePhoneNumber from "libphonenumber-js";
import { register } from "../services/auth";

export const addBook = asyncHandler(async (req, res) => {
  const { picture, cloudinary_public_id } = await handleUploadPicture(req);
  const addedBookId = await handleAddBook(
    req.body,
    picture,
    cloudinary_public_id
  );
  return res.status(201).json(addedBookId);
});

export const updateBook = asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;
  const book = await findBookBy("id", bookId);
  if (!book) throw new NotFound("Book not found");
  const updatedBook = await handleUpdateBook(
    +bookId,
    req,
    book.cloudinary_public_id
  );
  return res.status(200).json(updatedBook);
});

export const addEmployee = asyncHandler(async (req, res) => {
  const { full_name, email, password, phone, role } = req.body;

  const phoneNumber = parsePhoneNumber(phone, "EG");
  if (!phoneNumber?.isValid()) throw new BadRequest("Phone Number incorrect");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const { picture, cloudinary_public_id } = await handleUploadPicture(req);
  const { id } = await register(
    full_name,
    email,
    hashedPassword,
    phoneNumber.number,
    picture,
    cloudinary_public_id,
    role
  );
  return res
    .status(201)
    .json({ message: "You registered successfully", id, cloudinary_public_id });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const updatedSettings = await handleUpdateSettings(req);
  return res.status(200).json(updatedSettings);
});
