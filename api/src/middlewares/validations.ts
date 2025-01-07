import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(
  schema: z.ZodObject<any, any>,
  key: "body" | "params" | "query" | "headers" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req[key] = schema.parse(req[key]);
      next();
    } catch (error) {
      console.log({ error });
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ error: "Invalid data", message: error.errors[0].message });
      } else {
        next(error);
      }
    }
  };
}
