import { Request } from "express";
import { BadRequest } from "../lib/error";
import supabase from "./db";
import { handleDeletePicture, handleUploadPicture } from "../config/cloudinary";

interface bodyType {
  title: string;
  all_copies: number;
  regular_price: number;
  deposit: number;
  author: string;
  category: string;
  description?: string | null;
  publish_year?: number | null;
}

export const handleAddBook = async (
  {
    title,
    description,
    all_copies,
    regular_price,
    deposit,
    author,
    category,
    publish_year,
  }: bodyType,
  cover: string | null,
  cloudinary_public_id: string | null
) => {
  /* Add Author */
  const { data: author_id, error: error1 } = await supabase
    .from("authors")
    .upsert({ name: author }, { onConflict: "name" })
    .select("id")
    .maybeSingle();

  /* Add Category */
  const { data: category_id, error: error2 } = await supabase
    .from("categories")
    .upsert({ name: category }, { onConflict: "name" })
    .select("id")
    .maybeSingle();

  /* Add Book */
  const { data: book_id, error: error3 } = await supabase
    .from("books")
    .insert([
      {
        title,
        description,
        author_id: author_id?.id,
        category_id: category_id?.id,
        all_copies,
        copies_in_stock: all_copies,
        regular_price,
        deposit,
        cover,
        cloudinary_public_id,
        publish_year,
      },
    ])
    .select("id")
    .single();

  const error = error1 || error2 || error3;

  if (error) {
    console.log(error);
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
  if (req.body.picture) {
    await handleDeletePicture(oldPicurePublicId);
    const picture = await handleUploadPicture(req);

    const { data, error } = await supabase
      .from("books")
      .update({ ...req.body, ...picture })
      .eq("id", book_id)
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("books")
      .update(req.body)
      .eq("id", book_id)
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
};

export const handleUpdateSettings = async (req: Request) => {
  const { data, error } = await supabase
    .from("settings")
    .update(req.body)
    .eq("id", 1)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
