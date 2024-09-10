import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="min-w-full px-8 shadow-md font-bold">
      <div className="flex items-center justify-between mx-5">
        <Link to="/">
          <div className="flex items-center justify-center">
            <img src="logo.png" alt="logo" className="w-28 h-26" />
            <h1 className="font-extrabold text-3xl text-orange-400 pl-3">
              Book Store
            </h1>
          </div>
        </Link>

        <div className="space-x-5 flex items-center justify-center mr-4">
          <Link
            to="/update-user"
            className="space-x-3 flex items-center justify-center"
          >
            <img
              src="default-profile.jpg"
              alt="profile picture"
              className="rounded-full h-8 w-8"
            />
            <h1 className="hover:text-orange-400">User Name</h1>
          </Link>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-orange-400" : "hover:text-orange-400"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive ? "text-orange-400" : "hover:text-orange-400"
            }
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
