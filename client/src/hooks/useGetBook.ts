import { useQuery } from "@tanstack/react-query";
import { getBookApi } from "../services/users";

export const useGetBook = () => {
  const bookId = window.location.pathname.split('/')[2];
  const {
    data: book,
    isPending,
    error,
  } = useQuery({
    queryKey: ["book", `${bookId}`],
    queryFn: () => getBookApi(bookId),
  });

  return { book, isPending, error };
};
