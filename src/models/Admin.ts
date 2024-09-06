import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin {
  fullName: string;
  email: string;
  password: string;
  phone: number;
  wallet: number;
  picture: string;
}

export interface IAdminModel extends IAdmin, Document {}

const adminSchmea = new Schema(
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
    picture: {
      type: String,
      default: "profile/default-profile.jpg",
    },
    jobTitle: {
      type: String,
      enum: ["admin", "superAdmin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAdminModel>("Admin", adminSchmea);
