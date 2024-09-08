import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../lib/helpers";
import config from "../config/config";
import { UserPayload } from "../schemas/authSchemas";

export const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password, phone, picture } = req.body;
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      picture: picture ? picture : "profiles/default-profile.jpg",
    });
    const addedUser = await newUser.save();
    return res.status(201).json(addedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "Bad Credentials" });

    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) return res.status(400).json({ message: "Bad Credentials" });

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      type: user.type,
    });
    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      type: user.type,
    });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const user = jwt.verify(
      refreshToken,
      config.jwt.refreshSecret
    ) as UserPayload;

    const newAccessToken = generateAccessToken({
      userId: user.userId,
      type: user.type,
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "You are not authenticated" });
  }
};
