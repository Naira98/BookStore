import { z } from "zod";

export const addBookSchema = z.object({
  title: z
    .string({ message: "Title must be a string" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(50, { message: "Title must be less than 50 characters" }),

  copies: z
    .number({ message: "Coopies must be a number" })
    .int({ message: "Coopies must be an integer" })
    .nonnegative({ message: "Copies must be a non-negative value" }),

  regularPrice: z
    .number({ message: "regularPrice must be a number" })
    .nonnegative({ message: "regularPrice must be a non-negative value" }),

  deposit: z
    .number({ message: "Deposit must be a number" })
    .nonnegative({ message: "Deposit must be a non-negative value" }),

  poster: z.string({ message: "Poster must be a path to image" }).optional(),

  author: z
    .string({ message: "Author must be a string" })
    .min(3, { message: "Author must be at least 3 characters" })
    .max(50, { message: "Author must be less than 50 characters" }),

  description: z
    .string({ message: "Description must be a string" })
    .min(8, { message: "Description must be at least 8 characters" })
    .max(500, { message: "Description must be less than 500 characters" })
    .optional(),
});

export const addCopiesSchema = addBookSchema.pick({ copies: true });

export const updateBookShema = addBookSchema.partial();
