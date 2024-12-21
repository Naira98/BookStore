import { z } from "zod";

export const registerSchema = z.object({
  full_name: z
    .string({ message: "Full Name must be a string" })
    .min(4, { message: "Full Name must be 4 or more characters long" })
    .max(50, { message: "Full Name must be 50 or fewer characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string({ message: "Password must be a string" })
    .min(4, { message: "Password must be 4 or more characters long" })
    .max(30, { message: "Password must be 30 or fewer characters long" }),

  phone: z
    .string()
    .optional(),

  picture: z.string().optional(),
});

export const loginSchema = registerSchema.pick({ email: true, password: true });

export const updateAccountSchema = registerSchema
  .omit({ password: true, email: true })
  .partial();
