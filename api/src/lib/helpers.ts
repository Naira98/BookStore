import jwt from "jsonwebtoken";
import config from "../config/config";
import { UserPayload } from "../schemas/userSchemas";

export const generateAccessToken = (data: UserPayload) => {
  return jwt.sign(data, config.jwt.accessSecret, { expiresIn: "10m" });
};

export const generateRefreshToken = (data: UserPayload) => {
  return jwt.sign(data, config.jwt.refreshSecret);
};
