import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReduxState } from "../redux/authSlice";

const ProtectedRoutes = ({ children }: { children: ReactElement }) => {
  const isAuth = useSelector((state: ReduxState) => state.isAuth);

  if (!isAuth) return <Navigate to={"/login"} replace />;

  return children;
};

export default ProtectedRoutes;
