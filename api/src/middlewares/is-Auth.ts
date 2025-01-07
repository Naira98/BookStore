import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { UserPayload } from "../schemas/userSchemas";
import { Forbidden, Unauthorized } from "../lib/error";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("Authorization");
  if (!token) throw new Unauthorized("Access Declined");

  if (token.startsWith("Bearer")) token = token.split(" ").at(1);
  try {
    const payload = jwt.verify(token!, config.jwt.accessSecret) as UserPayload;
    req.user = payload;
    next();
  } catch (error) {
    throw new Forbidden("Invalid Access Token");
  }
};
