import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { ReduxState } from "../redux/authSlice";
import CheckWallet from "./CheckWallet";

const AppLayout = () => {
  const isAuth = useSelector((state: ReduxState) => state.isAuth);
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      {isAuth && <CheckWallet />}
    </div>
  );
};

export default AppLayout;
