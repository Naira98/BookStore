import { useQuery } from "@tanstack/react-query";
import { getBooksApi } from "../services/users";
import { useDispatch } from "react-redux";

export const useGetBooks = () => {
  const dispatch = useDispatch();

  const {
    data: books,
    isPending,
    error,
  } = useQuery({ queryKey: ["books"], queryFn: () => getBooksApi(dispatch) });

  return { books, isPending, error };
};
