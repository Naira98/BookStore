import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { IBookModel } from "../redux/authSlice";
import BookImage from "./BookImage";
import { formatCurrency } from "../utils/helpers";

const BookCard = ({ book }: { book: IBookModel }) => {
  const availablity = book.availableCopies > 0 ? "Available" : "Out of Stock";
  return (
    <Box className="has-overlay relative h-64 w-60">
      <Link to={`/book/${book._id}`}>
        <div className="flex flex-col items-center gap-2">
          <div
            className={`absolute left-0 top-0 z-10 ${
              availablity === "Available" ? "bg-green-primary" : "bg-gray-secondary"
            } px-2 py-1 text-amber-primary opacity-90`}
          >
            {availablity}
          </div>
          <div className="relative overflow-hidden">
            <div className="w-[11rem] h-[16rem]">
            <BookImage image={book.poster} />
            </div>
            <div className="overlay absolute bottom-0 inline-block w-44 bg-amber-secondary py-4 text-center text-slate">
              View Details
            </div>
          </div>
          <div className="text-center">
            <h2>{book.title}</h2>
            <h3>{formatCurrency(book.regularPrice)}</h3>
          </div>
        </div>
      </Link>
    </Box>
  );
};

export default BookCard;
