import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  phone: number;
  password: string;
  wallet: number;
  picture: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  copies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
  regularPrice: { type: Number, required: true },
  deposit: { type: Number, required: true },
  poster: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUserModel>("User", userSchema);
