import { z } from "zod";

const userPayladSchema = z.object({
  userId: z.string(),
  type: z.string(),
});

export type UserPayload = z.infer<typeof userPayladSchema>;