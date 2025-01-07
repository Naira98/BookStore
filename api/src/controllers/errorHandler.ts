import { NextFunction, Request, Response } from "express";
import { ErrorRequestHandler } from "express";
import { ApplicationError } from "../lib/error";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ error });
  if (error instanceof ApplicationError) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({
    message: error.message,
  });
};
