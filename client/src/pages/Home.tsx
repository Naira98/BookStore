import toast from "react-hot-toast";
import { useGetBooks } from "../hooks/useGetBooks";
import BookCard from "../components/BookCard";
import { Box } from "@mui/material";
import { IBookModel } from "../redux/authSlice";

const Home = () => {
  const { books, isPending, error } = useGetBooks();

  if (isPending) return <h1>Loading</h1>;
  if (error) toast.error(error.message);

  return (
    <Box className="flex flex-wrap gap-32 px-44 py-16">
      {books.map((book: IBookModel) => {
        return <BookCard key={book._id} book={book} />;
      })}
    </Box>
  );
};

export default Home;
