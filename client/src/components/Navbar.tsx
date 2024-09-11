import { Link, NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { State as ReduxState } from "../redux/authSlice";

const Navbar = () => {
  const isAuth = useSelector((state: ReduxState) => state.isAuth);
  return (
    <div className="min-w-full px-8 shadow-md font-bold">
      <div className="flex items-center justify-between mx-5">
        <Link to={isAuth ? "/" : "/login"}>
          <div className="flex items-center justify-center">
            <img src="logo.png" alt="logo" className="w-28 h-26" />
            <h1 className="font-extrabold text-3xl text-orange pl-3">
              Book Store
            </h1>
          </div>
        </Link>

        <div className="space-x-5 flex items-center justify-center mr-4">
          {isAuth && (
            <Link
              to="/update-user"
              className="space-x-3 flex items-center justify-center"
            >
              <img
                src="default-profile.jpg"
                alt="profile picture"
                className="rounded-full h-8 w-8"
              />
              <h1 className="hover:text-orange">User Name</h1>
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
            <button className="btn">
              <LogoutIcon /> Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
