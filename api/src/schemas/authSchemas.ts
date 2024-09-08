import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string({ message: "Name must be a string" })
    .min(4, { message: "Name must be 4 or more characters long" })
    .max(50, { message: "Name must be 50 or fewer characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string({ message: "Password must be a string" })
    .min(4, { message: "Password must be 4 or more characters long" })
    .max(30, { message: "Password must be 30 or fewer characters long" }),

  phone: z
    .string()
    .min(4, { message: "Phone number is too short" })
    .max(14, { message: "Phone number is too long" })
    .optional(),

  picturePath: z.string().optional(),
});

export const loginSchema = registerSchema.pick({ email: true, password: true });

export const updateAccountSchema = registerSchema.omit({ password: true }).partial();
