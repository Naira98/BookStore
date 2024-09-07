import { NextFunction, Request, Response } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.isAuth) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};
