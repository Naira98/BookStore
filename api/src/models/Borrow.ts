import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IBorrow {
  book: ObjectId;
  user: ObjectId;
  regularPrice: number;
  deposit: number;
  status: string;
  borrowingDate: Date;
  returnDate: Date;
}

export interface IBorrowModel extends IBorrow, Document<ObjectId> {}

const borrowSchema: Schema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    regularPrice: { type: Number, required: true },
    deposit: { type: Number, required: true },
    status: { type: String, enum: ["borrowed", "returned"] },
    borrowingDate: { type: Date, default: new Date() },
    returnDate: {
      type: Date,
      default: new Date(+new Date() + 14 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBorrowModel>("Borrow", borrowSchema);
