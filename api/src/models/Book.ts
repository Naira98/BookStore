import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IBook {
  title: string;
  copies: number;
  availableCopies: number;
  regularPrice: number;
  deposit: number;
  poster: string;
  author: string;
  description: string;
}

export interface IBookModel extends IBook, Document<ObjectId> {}

const bookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive value"],
    },
    availableCopies: {
      type: Number,
      required: true,
      min: [0, "Available copies must be a positive value"],
    },
    regularPrice: {
      type: Number,
      required: true,
      min: [0, "Regular Price must be a positive value"],
    },
    deposit: {
      type: Number,
      required: true,
      min: [0, "Deposit must be a positive value"],
    },
    poster: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBookModel>("Book", bookSchema);
