import { Box } from "@mui/material";
import { IBookModel } from "../redux/authSlice";
import BookImage from "./BookImage";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const BookCard = ({ book }: { book: IBookModel }) => {
  const currencyFormatter = useMemo(
    () =>
      Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    [],
  );

  const availablity = book.availableCopies > 0 ? "Available" : "Out of Stock";
  return (
      <Box className="has-overlay relative h-64 w-60">
        <Link to={`/book/${book._id}`}>
          <div className="flex flex-col items-center gap-2">
            <div
              className={`absolute left-0 top-0 z-10 ${
                availablity === "Available" ? "bg-green" : "bg-gray-secondary"
              } px-2 py-1 text-amber-primary opacity-90`}
            >
              {availablity}
            </div>
            {/* <Box className="overflow-hidden"> */}
            <div className="relative overflow-hidden">
              <BookImage image={book.poster} />
              <div className="overlay absolute bottom-0 inline-block w-44 bg-amber-secondary py-4 text-center text-slate">
                Quick View
              </div>
            </div>
            <div className="text-center">
              <h2>{book.title}</h2>
              <h3>{currencyFormatter.format(book.regularPrice)}</h3>
            </div>
            {/* </Box> */}
          </div>
        </Link>
      </Box>
  );
};

export default BookCard;
