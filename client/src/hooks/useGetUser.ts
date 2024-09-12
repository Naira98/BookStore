import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useGetUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: userData, isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserApi(navigate, dispatch),
  });

  return {userData, isPending, error}
};
