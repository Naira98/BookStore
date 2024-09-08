import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { UserPayload } from "../schemas/authSchemas";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Declined" });

  if (token.startsWith("Bearer")) {
    token = token.split(" ").at(1);
  }

  try {
    const payload = jwt.verify(token!, config.jwt.accessSecret) as UserPayload;
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token Invalid" });
  }
};
