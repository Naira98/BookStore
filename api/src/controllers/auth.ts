import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../lib/helpers";
import config from "../config/config";
import { UserPayload } from "../schemas/userSchemas";
import { handleUploadPicture } from "../config/cloudinary";
import {
  deleteRefreshToken,
  findRefreshToken,
  findUserBy,
  handleUpdateUser,
  register,
  upsertRefreshToken,
} from "../services/auth";
import { BadRequest, NotFound, Unauthorized } from "../lib/error";
import { asyncHandler } from "../middlewares/asyncHandler";
import parsePhoneNumber from "libphonenumber-js";

export const postRegister = asyncHandler(async (req, res) => {
  const { full_name, email, password, phone } = req.body;

  const phoneNumber = parsePhoneNumber(phone, "EG");
  if (!phoneNumber?.isValid()) throw new BadRequest("Phone Number incorrect");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const { picture, cloudinary_public_id } = await handleUploadPicture(req);
  const { id } = await register(
    full_name,
    email,
    hashedPassword,
    phoneNumber.number,
    picture,
    cloudinary_public_id
  );
  return res
    .status(201)
    .json({ message: "You registered successfully", id, cloudinary_public_id });
});

export const postLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  type User = Exclude<Awaited<ReturnType<typeof findUserBy>>, null>;
  const user:
    | (Omit<User, "password"> & { password?: User["password"] })
    | null = await findUserBy("email", email);
  if (!user) throw new BadRequest("Bad Credentials");

  const doMatch = await bcrypt.compare(password, user.password!);
  if (!doMatch) throw new BadRequest("Bad Credentials");

  if (user.password) delete user.password;

  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({
    userId: user.id,
    role: user.role,
  });

  await upsertRefreshToken(user.id, refreshToken);

  return res
    .status(200)
    .json({ user: user, tokens: { accessToken, refreshToken } });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const tokenInDB = await findRefreshToken(refreshToken);
  if (!tokenInDB) throw new Unauthorized("Invalid Token");

  const user = jwt.verify(
    refreshToken,
    config.jwt.refreshSecret
  ) as UserPayload;

  const newAccessToken = generateAccessToken({
    userId: user.userId,
    role: user.role,
  });

  return res.status(200).json({ accessToken: newAccessToken });
});

export const getUser = asyncHandler(async (req, res) => {
  type User = Exclude<Awaited<ReturnType<typeof findUserBy>>, null>;

  const user:
    | (Omit<User, "password"> & { password?: User["password"] })
    | null = await findUserBy("id", req.user?.userId!);
  if (!user) return res.status(404).json({ message: "User not found" });

  delete user.password;

  return res.status(200).json({ user });
});

export const updateAccount = asyncHandler(async (req, res) => {
  type UpdatedUser = Exclude<
    Awaited<ReturnType<typeof handleUpdateUser>>,
    null
  >;

  const user = await findUserBy("id", req.user?.userId!);
  if (!user) throw new NotFound("User not found");

  const updatedUser: Omit<UpdatedUser, "password"> & {
    password?: UpdatedUser["password"] | null;
  } = await handleUpdateUser(req, user.cloudinary_public_id);
  
  delete updatedUser.password;
  return res.status(200).json(updatedUser);
});

export const postLogout = asyncHandler(async (req, res) => {
  await deleteRefreshToken(req.user?.userId!);
  return res.status(200).json({ message: "Logged Out!" });
});
