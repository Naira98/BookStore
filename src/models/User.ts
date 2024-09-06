import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phone: number;
  wallet: number;
  picture: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema(
  {
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
    wallet: {
      type: Number,
      default: 0,
    },
    picture: {
      type: String,
      default: "profile/default-profile.jpg",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>("User", userSchema);
