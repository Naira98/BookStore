import { z } from "zod";

const userPayladSchema = z.object({
  userId: z.number(),
  role: z.enum(["user", "super_admin", "admin", "courier"]),
});

export type UserPayload = z.infer<typeof userPayladSchema>;
