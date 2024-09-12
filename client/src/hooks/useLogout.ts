import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../services/auth";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      dispatch(setLogout());
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      navigate("/login");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { logout, isPending, error };
};
