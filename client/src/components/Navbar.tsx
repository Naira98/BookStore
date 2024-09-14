import { Link, NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { ReduxState as ReduxState } from "../redux/authSlice";
import { useLogout } from "../hooks/useLogout";
import ProfileImage from "./ProfileImage";

const Navbar = () => {
  const { user, isAuth } = useSelector((state: ReduxState) => state);
  const { logout } = useLogout();
  return (
    <div className="min-w-full px-8 font-bold shadow-md">
      <div className="mx-5 flex items-center justify-between">
        <Link to={isAuth ? "/" : "/login"}>
          <div className="flex items-center justify-center">
            <img src="logo.png" alt="logo" className="h-26 w-28" />
            {/* <img src="logo2.png" alt="logo" className="h-[100px] ml-[-20%] mr-[-18%] mt-[-15%] mb-[-22%]" /> */}
            <h1 className="pl-3 text-3xl font-extrabold text-orange">
              Book Store
            </h1>
          </div>
        </Link>

        <div className="mr-4 flex items-center justify-center space-x-5">
          {isAuth && (
            <Link
              to="/update-user"
              className="flex items-center justify-center space-x-3"
            >
              <ProfileImage image={user!.picture} />
              <h1 className="hover:text-orange">
                {user ? user.firstName : "user"}
              </h1>
            </Link>
          )}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-orange" : "hover:text-orange"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive ? "text-orange" : "hover:text-orange"
            }
          >
            Contact Us
          </NavLink>
          {isAuth && (
            <button className="btn" onClick={() => logout()}>
              <LogoutIcon /> Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
