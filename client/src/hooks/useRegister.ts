import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../services/auth";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RegisterFormType } from "../components/RegisterForm";

export const useRegister = () => {
  const navigate = useNavigate();

  const {
    mutate: register,
    isPending,
    error,
  } = useMutation({
    mutationFn: (values: RegisterFormType) => registerApi(values),
    onSuccess: () => {
      toast.success("You Registered Successfully");
      navigate("/login");
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message);
    },
  });
  return { register, isPending, error };
};
