import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  wallet: number;
  picture: string;
  type: string;
}

export interface IUserModel extends IUser, Document<ObjectId> {}

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
      type: String,
      required: true,
      unique: true,
    },
    wallet: {
      type: Number,
      default: 0,
      min: [0, "Wallet can't be negative"],
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
