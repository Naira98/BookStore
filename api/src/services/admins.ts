import { Request } from "express";
import { BadRequest } from "../lib/error";
import supabase from "./db";
import { handleDeletePicture, handleUploadPicture } from "../config/cloudinary";

interface bodyType {
  title: string;
  all_copies: number;
  copies_in_stock?: number;
  regular_price: number;
  deposit: number;
  author: string;
  category: string;
  description?: string | null;
  publish_year?: number | null;
}

const upsertAuthor = async (author: string) => {
  const { data: authorData, error } = await supabase
    .from("authors")
    .upsert({ name: author }, { onConflict: "name" })
    .select("id")
    .maybeSingle();
  if (error) {
    if (error.code == "23505") throw new BadRequest(error.message);
    throw new Error(error.message);
  }
  return authorData?.id;
};

const upsertCategory = async (category: string) => {
  const { data: categoryData, error } = await supabase
    .from("categories")
    .upsert({ name: category }, { onConflict: "name" })
    .select("id")
    .maybeSingle();
  if (error) {
    if (error.code == "23505") throw new BadRequest(error.message);
    throw new Error(error.message);
  }

  return categoryData?.id;
};

export const handleAddBook = async (
  {
    title,
    description,
    all_copies,
    copies_in_stock = all_copies,
    regular_price,
    deposit,
    author,
    category,
    publish_year,
  }: bodyType,
  picture: string | null,
  cloudinary_public_id: string | null
) => {
  const [author_id, category_id] = await Promise.all([
    upsertAuthor(author),
    upsertCategory(category),
  ]);
  /* Add Book */
  const { data: book_id, error } = await supabase
    .from("books")
    .insert([
      {
        title,
        description,
        author_id: author_id,
        category_id: category_id,
        all_copies,
        copies_in_stock,
        regular_price,
        deposit,
        picture,
        cloudinary_public_id,
        publish_year,
      },
    ])
    .select("id")
    .single();

  if (error) {
    if (error.code == "23505") throw new BadRequest(error.message);
    throw new Error(error.message);
  }
  return book_id;
};

export const handleUpdateBook = async (
  book_id: number,
  req: Request,
  oldPicurePublicId?: string | null
) => {
  if (req.file) {
    await handleDeletePicture(oldPicurePublicId);
    const picture = await handleUploadPicture(req);

    const { data, error } = await supabase
      .from("books")
      .update({ ...req.body, ...picture })
      .eq("id", book_id)
      .select()
      .single();
    if (error) throw new Error(error.message);

    return data;
  } else {
    const { data, error } = await supabase
      .from("books")
      .update(req.body)
      .eq("id", book_id)
      .select()
      .single();
    if (error) throw new Error(error.message);

    return data;
  }
};

export const handleUpdateBookAuthor = async (
  book_id: number,
  author: string
) => {
  const author_id = await upsertAuthor(author);
  const { data, error } = await supabase
    .from("books")
    .update({ author_id })
    .eq("id", book_id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const handleUpdateBookCategory = async (
  book_id: number,
  category: string
) => {
  const category_id = await upsertCategory(category);
  const { data, error } = await supabase
    .from("books")
    .update({ category_id })
    .eq("id", book_id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const handleUpdateSettings = async (req: Request) => {
  const { data, error } = await supabase
    .from("settings")
    .update(req.body)
    .eq("id", 1)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const handleDeleteBook = async (book_id: number) => {
  const { error } = await supabase.from("books").delete().eq("id", book_id);
  if (error) throw new Error(error.message);
};
