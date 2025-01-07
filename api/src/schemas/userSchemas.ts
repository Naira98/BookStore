import { z } from "zod";

const userPayladSchema = z.object({
  userId: z.number(),
  role: z.enum(["user", "super_admin", "admin", "courier"]),
});

export const findByCategoryParamsSchema = z.object({
  category: z.string(),
});
export const findByAuthorParamsSchema = z.object({
  author: z.string(),
});
export const searchBooksParamsSchema = z.object({
  bookTitle: z.string(),
});
export const createCheckoutSessionParamsSchema = z.object({
  price: z.string(),
});
export const addMoneyParamsSchema = z.object({
  userId: z.string(),
});
export const addMoneyQuerySchema = z.object({
  success: z.enum(["true", "false"]),
  front_end_url: z.string(),
});
export const createCheckoutSessionBodySchema = z.object({
  callback_frontend_url: z.string(),
});
export const addRemoveWishlistOrCartSchema = z.object({
  book_id: z.number(),
});
export const borrowBooksSchema = z.object({
  payment_method: z.enum(["cash", "wallet"]),
  borrow_method: z.enum(["pick_up", "delivery"]),
  address: z.string(),
});
export const returnBooksSchema = z.object({
  borrow_book_ids: z.array(z.number()),
  return_method: z.enum(["pick_up", "delivery"]),
  address: z.string(),
});

export type UserPayload = z.infer<typeof userPayladSchema>;
