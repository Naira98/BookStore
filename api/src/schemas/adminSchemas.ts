import { z } from "zod";

export const addBookSchema = z.object({
  title: z
    .string({ message: "Title must be a string" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(50, { message: "Title must be less than 50 characters" }),

  all_copies: z.string(),
  regular_price: z.string(),
  deposit: z.string(),
  description: z
    .string({ message: "Description must be a string" })
    .min(8, { message: "Description must be at least 8 characters" })
    .max(1500, { message: "Description must be less than 1500 characters" })
    .optional(),

  author: z
    .string({ message: "Author must be a string" })
    .min(3, { message: "Author must be at least 3 characters" })
    .max(50, { message: "Author must be less than 50 characters" }),

  category: z
    .string({ message: "Category must be a string" })
    .min(3, { message: "Category must be at least 3 characters" })
    .max(50, { message: "Category must be less than 50 characters" }),

  publish_year: z.string().optional(),
});

export const updateBookShema = addBookSchema.partial();

export const updateSettingsSchema = z.object({
  borrow_days: z
    .number({ message: "Borrow Days must be a number" })
    .min(0, { message: "Borrow Days can't be less than 0" }),
  delay_fees_per_day: z
    .number({ message: "Delay fees per day must be a number" })
    .min(0, { message: "Delay fees per day can't be less than 0" }),
  delivery_fees: z
    .number({ message: "Delivery fees must be a number" })
    .min(0, { message: "Delivery fees can't be less than 0" }),
});