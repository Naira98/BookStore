import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { UserPayload } from "../schemas/authSchemas";

export const generateAccessToken = (data: UserPayload) => {
  return jwt.sign(data, config.jwt.accessSecret, { expiresIn: "5m" });
};

export const generateRefreshToken = (data: UserPayload) => {
  return jwt.sign(data, config.jwt.refreshSecret);
};
