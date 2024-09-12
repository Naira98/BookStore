import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../services/auth";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/authSlice";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: (data) => {
      // data: {user: {}, tokens: {}}
      queryClient.invalidateQueries({ queryKey: ["user"] });
      dispatch(setLogin(data.user));
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
      localStorage.setItem("accessToken", data.tokens.accessToken);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { login, isPending, error };
};
