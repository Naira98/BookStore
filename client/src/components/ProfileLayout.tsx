import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ProfileLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-[1fr_4fr]">
        <div className="relative">
          <Sidebar />
        </div>
        <div className="col-start-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
