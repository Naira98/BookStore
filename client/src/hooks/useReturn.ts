import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { returnApi } from "../services/users";

export const useReturn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: returnBook,
    isPending,
    error,
  } = useMutation({
    mutationFn: (borrowId: string) => returnApi(borrowId),
    onSuccess: (newBorrow) => {
      console.log(newBorrow);
      // data: returnedBook
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/history");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { returnBook, isPending, error };
};
