import { z } from "zod";

export const headersSchema = z
  .object({
    host: z.union([z.literal("www.localhost:3000"), z.literal("localhost:3000")]),
  })
  .passthrough();
