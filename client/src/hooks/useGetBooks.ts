import { useQuery } from "@tanstack/react-query";
import { getBooksApi } from "../services/users";

export const useGetBooks = () => {
  const {
    data: books,
    isPending,
    error,
  } = useQuery({ queryKey: ["books"], queryFn: () => getBooksApi() });

  return { books, isPending, error };
};
