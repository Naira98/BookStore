import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { borrowApi } from "../services/users";

export const useBorrow = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: borrow,
    isPending,
    error,
  } = useMutation({
    mutationFn: (bookId: string) => borrowApi(bookId),
    onSuccess: (newBorrow) => {
      console.log(newBorrow);
      // data: addedBorrow
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/history");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { borrow, isPending, error };
};
