import { NextFunction, Request, Response } from "express";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "user") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};
