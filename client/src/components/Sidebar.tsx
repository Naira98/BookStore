import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="text-grey-primary fixed flex h-screen w-[20vw] flex-col gap-1 p-4 font-sans text-base font-normal shadow-md">
      <NavLink
        to="/wallet"
        className={({ isActive }) =>
          isActive
            ? "sidebar-item bg-blue bg-opacity-80 text-cyan-primary"
            : "sidebar-item"
        }
      >
        <div className="mr-4 grid place-items-center">
          <AccountBalanceWalletOutlinedIcon />
        </div>
        Wallet
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) =>
          isActive
            ? "sidebar-item bg-blue bg-opacity-80 text-cyan-primary"
            : "sidebar-item"
        }
      >
        <div className="mr-4 grid place-items-center">
          <CalendarMonthOutlinedIcon />
        </div>
        History
      </NavLink>

      <NavLink
        to="/account"
        className={({ isActive }) =>
          isActive
            ? "sidebar-item bg-blue bg-opacity-80 text-cyan-primary"
            : "sidebar-item"
        }
      >
        <div className="mr-4 grid place-items-center">
          <ManageAccountsOutlinedIcon />
        </div>
        Account
      </NavLink>
    </nav>
  );
};

export default Sidebar;
