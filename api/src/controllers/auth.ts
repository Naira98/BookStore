import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../lib/helpers";
import config from "../config/config";
import { UserPayload } from "../schemas/userSchemas";

export const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password, phone, picturePath } = req.body;
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      picture: picturePath
        ? picturePath
        : "/assets/profiles/default-profile.jpg",
    });
    const addedUser: Omit<IUser, "password"> & { password?: string } =
      await newUser.save();

    delete addedUser.password;

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

export const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.set(req.body);
    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
