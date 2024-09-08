import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.type !== "admin" && req.user?.type !== "superAdmin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};
