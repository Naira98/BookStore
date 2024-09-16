import toast from "react-hot-toast";
import { useGetHistory } from "../hooks/useGetHistory";
import HistoryItem from "../components/HistoryItem";
import { IBorrowModel } from "../redux/authSlice";
import { Box } from "@mui/material";
import Spinner from "../components/Spinner";

const History = () => {
  const { history, isPending, error } = useGetHistory();
  console.log(history);
  if (isPending) return <Spinner />
  if (error) toast.error(error.message);
  return (
    <Box className="flex flex-col gap-2 py-4 px-6">
      {history.map((item: IBorrowModel) => {
        return <HistoryItem borrow={item} key={item._id} />;
      })}
    </Box>
  );
};

export default History;
