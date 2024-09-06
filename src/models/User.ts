import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phone: number;
  wallet: number;
  picture: string;
  type: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema(
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
    type: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>("User", userSchema);
