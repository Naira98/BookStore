import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { ObjectId } from "mongoose";

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
    return res.status(500).json({ message: (error as Error).message });
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

    req.session.isAuth = true;
    req.session.userId = user._id as ObjectId;
    req.session.type = user.type;

    return res.status(200).json(req.session);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};
export const postLogout = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw new Error(err);
      }
    });
    res.clearCookie("connect.sid");
    return res.status(200).json('Logged out successfully')
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};
