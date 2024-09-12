import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
      default: '',
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
