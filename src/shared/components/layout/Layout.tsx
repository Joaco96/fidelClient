import { NavLink, Outlet } from "react-router";
import { useAuth } from "../../../app/providers/AuthProvider";
import ErrorPage from "../../../pages/ErrorPage";

const Layout = () => {
  const { logout } = useAuth();

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between py-3 px-8 bg-white text-white fixed z-2 h-[70px]">
        <NavLink to="/app/dashboard">Navbar</NavLink>
        <div className="flex items-center gap-4">
          <NavLink to="/app/profile">
            {({ isActive }) => (
              <span className={isActive ? "text-amber-500" : "text-white"}>
                Profile
              </span>
            )}
          </NavLink>
          <button
            onClick={logout}
            className=" bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="top-[70px] relative z-0">{Outlet({}) ? <Outlet /> : <ErrorPage />}</div>
    </div>
  );
};

export default Layout;
