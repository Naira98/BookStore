import { useMutation } from "@tanstack/react-query";
import { addMoneyApi } from "../services/users";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAddMoney = () => {
    const navigate = useNavigate();

  const {
    mutate: addMoney,
    isPending,
    error,
  } = useMutation({
    mutationFn: (amount: string) => addMoneyApi(amount),
    onSuccess: (data) => {
      console.log(data);
      navigate('/wallet')
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addMoney, isPending, error };
};
