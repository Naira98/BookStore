import { Request } from "express";
import { BadRequest } from "../lib/error";
import { IBook } from "../types/db_types";
import { authors, books, categories, settings } from "./db";
import { handleDeletePicture, handleUploadPicture } from "../config/cloudinary";

interface addBookBody extends IBook {
  author: string;
  category: string;
}

const upsertAuthor = async (author: string) => {
  try {
    const [{ id }] = await authors()
      .insert({ name: author, updated_at: new Date() })
      .onConflict(["name"])
      .merge()
      .returning("id");
    return id;
  } catch (error) {
    console.log(error);
    if (error.code == "23505") throw new BadRequest(error.message);
    throw new Error(error.message);
  }
};

const upsertCategory = async (category: string) => {
  try {
    const [{ id }] = await categories()
      .insert({ name: category, updated_at: new Date() })
      .onConflict(["name"])
      .merge()
      .returning("id");
    return id;
  } catch (error) {
    console.log(error);
    if (error.code == "23505") throw new BadRequest(error.message);
    throw new Error(error.message);
  }
};

export const handleAddBook = async (
  {
    title,
    description,
    all_copies,
    copies_in_stock = all_copies,
    borrow_fees,
    deposit,
    author,
    category,
    publish_year,
  }: addBookBody,
  picture: string | null,
  cloudinary_public_id: string | null
) => {
  try {
    const [author_id, category_id] = await Promise.all([
      upsertAuthor(author),
      upsertCategory(category),
    ]);
    /* Add Book */
    const [book] = await books().insert(
      {
        title,
        description,
        author_id,
        category_id,
        all_copies,
        copies_in_stock,
        borrow_fees,
        deposit,
        picture,
        cloudinary_public_id,
        publish_year,
      },
      "*"
    );
    return book;
  } catch (error) {
    if (error.code == "23505")
      throw new BadRequest("Book title already exists");
    throw new Error(error.message);
  }
};

export const handleUpdateBook = async (
  book_id: number,
  req: Request,
  oldPicurePublicId?: string | null
) => {
  if (req.file) {
    await handleDeletePicture(oldPicurePublicId);
    const picture = await handleUploadPicture(req);
    const [book] = await books()
      .update({ ...req.body, ...picture, updated_at: new Date() })
      .where({ id: book_id })
      .returning("*");
    return book;
  } else {
    const [book] = await books()
      .update({ ...req.body, updated_at: new Date() })
      .where({ id: book_id })
      .returning("*");
    return book;
  }
};

export const handleUpdateBookAuthor = async (
  book_id: number,
  author: string
) => {
  const author_id = await upsertAuthor(author);
  const [book] = await books()
    .update({ author_id, updated_at: new Date() })
    .where({ id: book_id })
    .returning("*");
  return book;
};

export const handleUpdateBookCategory = async (
  book_id: number,
  category: string
) => {
  const category_id = await upsertCategory(category);
  const [book] = await books()
    .update({ category_id, updated_at: new Date() })
    .where({ id: book_id })
    .returning("*");
  return book;
};

export const handleUpdateSettings = async (req: Request) => {
  const [data] = await settings()
    .insert({ id: 1, ...req.body, updated_at: new Date() })
    .onConflict(["id"])
    .merge()
    .returning("*");
  return data;
};

export const handleDeleteBook = async (book_id: number) => {
  await books().delete().where({ id: book_id });
};
