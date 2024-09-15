import { useState } from "react";
import toast from "react-hot-toast";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useGetBook } from "../hooks/useGetBook";
import BookImage from "../components/BookImage";
import { formatCurrency } from "../utils/helpers";
import { amountOfWords } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { book, isPending, error } = useGetBook();
  const navigate = useNavigate();

  if (isPending) return <h1>Loading...</h1>;
  if (error) toast.error(error.message);

  const {
    title,
    regularPrice,
    deposit,
    availableCopies,
    poster,
    description,
    author,
  } = book;

  const splittedText = description.split(" ");
  const itCanOverflow = splittedText.length > amountOfWords;
  const text =
    itCanOverflow && !isExpanded
      ? `${splittedText.slice(0, amountOfWords - 1).join(" ")}.....`
      : description;

  const available = availableCopies > 0;

  return (
    <>
      <div
        className="cursor-pointer px-12 py-6 absolute text-lg"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackOutlinedIcon /> Back
      </div>
      <div className="grid grid-cols-2 gap-8 px-10 py-14 sm:px-16 md:px-24">
        <div className="max-w-60 justify-self-end sm:max-w-64 md:max-w-96">
          <BookImage image={poster} />
        </div>

        <div className="my-auto">
          <h1 className="text-orange-primary my-6 text-3xl font-bold">
            {title}
          </h1>
          <h1 className="text-lg font-bold">
            Price: {formatCurrency(regularPrice + deposit)}
          </h1>
          <h1>
            ({formatCurrency(regularPrice)} Borrowing +{" "}
            {formatCurrency(deposit)} Deposit)
          </h1>
          <h1 className="my-4 font-bold">Author: {author}</h1>
          <h1>
            {text}{" "}
            {itCanOverflow && (
              <span
                className="cursor-pointer font-semibold underline"
                onClick={() => {
                  setIsExpanded((e) => !e);
                }}
              >
                {isExpanded ? "Show Less" : "Read More"}
              </span>
            )}
          </h1>
          {available ? (
            <button className="btn-secondary my-6 w-44">Borrow Now</button>
          ) : (
            <button className="btn-unavailable my-6 w-44" disabled>
              Out Of Stock
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;
