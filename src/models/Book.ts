import mongoose, { Schema, Document } from "mongoose";

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

export interface IBookModel extends IBook, Document {}

const bookSchema: Schema = new Schema(
  {
    title: {
      type: String,
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
  },
  { timestamps: true }
);

export default mongoose.model<IBookModel>("Book", bookSchema);
