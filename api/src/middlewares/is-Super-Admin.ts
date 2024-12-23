import { NextFunction, Request, Response } from "express";
import { Forbidden } from "../lib/error";

export const isSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "super_admin") {
    throw new Forbidden("Forbidden");
  }
  next();
};
