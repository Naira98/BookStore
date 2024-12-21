import { Request } from "express";
import supabase from "./db";
import { handleDeletePicture, handleUploadPicture } from "../config/cloudinary";
import { Conflict, Unauthorized } from "../lib/error";

export const register = async (
  full_name: string,
  email: string,
  password: string,
  phone: string,
  picture: string | null,
  cloudinary_public_id: string | null
) => {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        full_name,
        email,
        password,
        phone,
        picture,
        cloudinary_public_id,
        role: "user",
        wallet: 0,
      },
    ])
    .select("id")
    .single();

  if (error) {
    if (error.code == "23505") throw new Conflict("Email already exists");
    throw new Error(error.message);
  }
  return data;
};

export const findUserBy = async (findBy: string, value: string | number) => {
  let { data: user, error } = await supabase
    .from("users")
    .select()
    .eq(findBy, value)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return user;
};

export const handleUpdateUser = async (
  req: Request,
  oldPicurePublicId: string | null
) => {
  if (req.user?.userId) {
    if (req.body.picture) {
      await handleDeletePicture(oldPicurePublicId);
      const picture = await handleUploadPicture(req);

      const { data, error } = await supabase
        .from("users")
        .update({ ...req.body, picture })
        .eq("id", req.user.userId)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } else {
      const { data, error } = await supabase
        .from("users")
        .update(req.body)
        .eq("id", req.user.userId)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  } else {
    throw new Unauthorized("You are not authenticated");
  }
};

export const upsertRefreshToken = async (
  user_id: number,
  refresh_token: string
) => {
  const { data, error } = await supabase
    .from("tokens")
    .upsert({ user_id, refresh_token });

  if (error) {
    throw new Error(error.message);
  }
};

export const findRefreshToken = async (refresh_token: string) => {
  const { data, error } = await supabase
    .from("tokens")
    .select()
    .eq("refresh_token", refresh_token)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteRefreshToken = async (user_id: number) => {
  const { error } = await supabase
    .from("tokens")
    .delete()
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteUsers = async (id: number) => {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};
