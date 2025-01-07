import { Request } from "express";
import { handleDeletePicture, handleUploadPicture } from "../config/cloudinary";
import { Conflict, Unauthorized } from "../lib/error";
import { ERoleType } from "../types/db_types";
import { tokens, users } from "./db";
import { Knex } from "knex";

export const register = async (
  full_name: string,
  email: string,
  password: string,
  phone: string,
  picture: string | null,
  cloudinary_public_id: string | null,
  role: ERoleType = "user"
) => {
  try {
    const [data] = await users()
      .insert({
        full_name,
        email,
        password,
        phone,
        picture,
        cloudinary_public_id,
        role,
      })
      .returning(["id", "role"]);
    return { id: data.id, role: data.role };
  } catch (error) {
    if (error.code == "23505") throw new Conflict("Email already exists");
    throw new Error(error.message);
  }
};

export const findUserBy = async (
  findBy: string,
  value: string | number,
  trx?: Knex.Transaction
) => {
  let query = users().select("*").where(findBy, "=", value);
  if (trx) query.transacting(trx);

  const [user] = await query;
  return user;
};

export const upsertRefreshToken = async (
  user_id: number,
  refresh_token: string
) => {
  await tokens()
    .insert({ user_id, refresh_token, updated_at: new Date() })
    .onConflict(["user_id"])
    .merge();
};

export const findRefreshToken = async (refresh_token: string) => {
  const [token] = await tokens().select("*").where({ refresh_token });
  return token;
};

export const handleUpdateUser = async (
  req: Request,
  oldPicurePublicId: string | null
) => {
  if (req.user?.userId) {
    if (req.file) {
      await handleDeletePicture(oldPicurePublicId);
      const picture = await handleUploadPicture(req);
      const [user] = await users()
        .update({ ...req.body, ...picture, updated_at: new Date() })
        .where({ id: req.user.userId })
        .returning("*");
      return user;
    } else {
      const [user] = await users()
        .update({ ...req.body, updated_at: new Date() })
        .where({ id: req.user.userId })
        .returning("*");
      return user;
    }
  } else {
    throw new Unauthorized("You are not authenticated");
  }
};

export const deleteRefreshToken = async (user_id: number) => {
  await tokens().where({ user_id }).del();
};

export const deleteUsers = async (id: number) => {
  await users().where({ id }).del();
};
