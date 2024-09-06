import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.type === "admin") {
    next();
  }
  return res.status(403).json({ message: "Unauthorized" });
};
