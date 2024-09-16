import { Box } from "@mui/material";
import { IBorrowModel } from "../redux/authSlice";
import BookImage from "./BookImage";
import {
  differenceInDays,
  format,
  formatDistanceToNow,
  isFuture,
  isPast,
  isToday,
} from "date-fns";
import { formatCurrency } from "../utils/helpers";
import { Link } from "react-router-dom";
import { DELAY_FEES } from "../utils/constants";
import { useReturn } from "../hooks/useReturn";
import SpinnerMini from "./SpinnerMini";

const HistoryItem = ({ borrow }: { borrow: IBorrowModel }) => {
  const { _id: bookId, title, poster } = borrow.book;
  const {
    _id: borrowId,
    borrowingDate,
    returnDate,
    regularPrice,
    deposit,
    status,
  } = borrow;

  const { returnBook, isPending } = useReturn();

  const isBorrowed = status === "borrowed";
  const isPastDate = isPast(new Date(returnDate));
  const isFutureDate = isFuture(new Date(returnDate));
  const isTodayDate = isToday(new Date(returnDate));

  return (
    <Box className="flex justify-between rounded-md border-2">
      <Box className="flex items-center gap-6">
        <Link to={`/book/${bookId}`}>
          <div className="w-28">
            <BookImage image={poster} />
          </div>
        </Link>

        <div className="space-y-2 py-4">
          <Link to={`/book/${bookId}`}>
            <h1 className="py-2 text-xl font-semibold">{title}</h1>
          </Link>

          <h2
            className={`${isBorrowed && isPastDate && "text-red-primary font-bold"} ${!isBorrowed && "text-slate"}`}
          >
            {format(new Date(borrowingDate), "EEE, MMM dd yyyy")} &mdash;{" "}
            {format(new Date(returnDate), "EE, MMM dd yyyy")} (
            {isTodayDate && "Today"}
            {isFutureDate &&
              ` In ${formatDistanceToNow(new Date(returnDate))} `}
            {isPastDate &&
              ` From ${differenceInDays(Date.now(), new Date(returnDate))} days `}
            )
          </h2>

          <h2
            className={`text-orange-primary font-bold ${isBorrowed && isPastDate && "text-red-primary"} ${!isBorrowed && "font-medium text-slate"}`}
          >
            {formatCurrency(regularPrice)} price + {formatCurrency(deposit)}{" "}
            deposit{" "}
            {isBorrowed &&
              isPastDate &&
              ` + ${formatCurrency(regularPrice * DELAY_FEES)} delay fees`}
          </h2>
        </div>
      </Box>

      <Box className="flex items-center gap-5 px-8 py-8">
        {isBorrowed && (
          <Box>
            <button
              onClick={() => returnBook(borrowId)}
              className={`btn-tertiary flex items-center justify-center ${isPending && "cursor-not-allowed"}`}
              disabled={isPending}
            >
              {isPending && <SpinnerMini color="green-primary"/>}
              Return Book
            </button>
          </Box>
        )}
        {isBorrowed && isPastDate && (
          <Box className="w-24 text-center">
            <h1 className="bg-red-secondary rounded-md py-2 text-amber-primary">
              Delay
            </h1>
          </Box>
        )}
        {isBorrowed && isFutureDate && (
          <Box className="w-24 text-center">
            <h1 className="bg-green-primary rounded-md py-2 text-amber-primary">
              Borrowed
            </h1>
          </Box>
        )}

        {!isBorrowed && (
          <Box className="w-24 text-center">
            <h1 className="rounded-md bg-gray-secondary py-2 text-amber-primary">
              Returned
            </h1>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HistoryItem;
