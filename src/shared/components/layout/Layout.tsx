import { NavLink, Outlet } from "react-router";
import { useAuth } from "../../../app/providers/AuthProvider";
import ErrorPage from "../../../pages/ErrorPage";

const Layout = () => {
  const { logout } = useAuth();

  return (
    <>
      <div className="w-[100dvw] flex items-center justify-between py-3 px-8 bg-amber-950 text-white">
        <NavLink to="/app/dashboard">Navbar</NavLink>
        <div className="flex items-center gap-4">
          <NavLink to="/app/profile">
            {({isActive}) => <span className={ isActive ? "text-amber-500" : "text-white" }>Profile</span>}
          </NavLink>
          <button
            onClick={logout}
            className=" bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-[70dvw] m-auto py-8">
        {Outlet({}) ? <Outlet /> : <ErrorPage />}
      </div>
    </>
  );
};

export default Layout;
