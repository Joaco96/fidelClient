import { NavLink, Outlet } from "react-router";
import { useAuth } from "../../../app/providers/AuthProvider";
import ErrorPage from "../../../pages/ErrorPage";
import LogoSvg from "../logoSvg";

const Layout = () => {
  const { logout } = useAuth();

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between py-3 px-8 bg-white text-white fixed z-2 h-[70px]">
        <NavLink to="/app/dashboard">
          <LogoSvg/>
        </NavLink>
        <div className="flex items-center gap-4">
          <NavLink to="/app/profile">
            {({ isActive }) => (
              <span className={isActive ? "text-amber-500 cursor-pointer" : "text-[#000] cursor-pointer"}>
                Profile
              </span>
            )}
          </NavLink>
          <button
            onClick={logout}
            className=" text-[#000] py-2 cursor-pointer disabled:opacity-50"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="top-[70px] relative z-0">
        {Outlet({}) ? <Outlet /> : <ErrorPage />}
      </div>
    </div>
  );
};

export default Layout;
