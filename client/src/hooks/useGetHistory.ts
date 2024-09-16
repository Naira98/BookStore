import { useQuery } from "@tanstack/react-query";
import { historyApi } from "../services/users";

export const useGetHistory = () => {
  const {
    data: history,
    isPending,
    error,
  } = useQuery({
    queryKey: ["history"],
    queryFn: () => historyApi(),
  });

  return { history, isPending, error };
};
