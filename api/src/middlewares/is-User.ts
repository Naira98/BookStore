import { NextFunction, Request, Response } from "express";
import { Forbidden } from "../lib/error";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "user") throw new Forbidden("Forbidden");
  next();
};
