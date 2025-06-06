import { NavLink, Outlet } from "react-router";
import { useAuth } from "../../../app/providers/AuthProvider";
import ErrorPage from "../../../pages/ErrorPage";
import LogoSvg from "../LogoSvg";
import { RoleIds } from "../../../entitites/Role";

const Layout = () => {
  const { logout, userData } = useAuth();
  const userRole = userData?.role;

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between py-3 px-8 bg-white text-white fixed z-2 h-[70px]">
        <NavLink to="/">
          <LogoSvg />
        </NavLink>
        <div className="flex items-center gap-4">
          <NavLink to="/app/dashboard">
            {({ isActive }) => (
              <span
                className={
                  isActive
                    ? "text-amber-500 cursor-pointer"
                    : "text-[#000] cursor-pointer"
                }
              >
                Inicio
              </span>
            )}
          </NavLink>
          {userRole &&
            (userRole >= RoleIds.ADMIN ? (
              <NavLink to="/app/admin">
                {({ isActive }) => (
                  <span
                    className={
                      isActive
                        ? "text-amber-500 cursor-pointer"
                        : "text-[#000] cursor-pointer"
                    }
                  >
                    Panel
                  </span>
                )}
              </NavLink>
            ) : null)}
          {userRole &&
            (userRole >= RoleIds.ADMIN ? (
              <NavLink to="/app/users">
                {({ isActive }) => (
                  <span
                    className={
                      isActive
                        ? "text-amber-500 cursor-pointer"
                        : "text-[#000] cursor-pointer"
                    }
                  >
                    Usuarios
                  </span>
                )}
              </NavLink>
            ) : null)}
            {userRole &&
            (userRole >= RoleIds.EMPLOYEE ? (
              <NavLink to="/app/ticket">
                {({ isActive }) => (
                  <span
                    className={
                      isActive
                        ? "text-amber-500 cursor-pointer"
                        : "text-[#000] cursor-pointer"
                    }
                  >
                    Tickets
                  </span>
                )}
              </NavLink>
            ) : null)}
          <NavLink to="/app/rewards">
            {({ isActive }) => (
              <span
                className={
                  isActive
                    ? "text-amber-500 cursor-pointer"
                    : "text-[#000] cursor-pointer"
                }
              >
                Beneficios
              </span>
            )}
          </NavLink>
          <NavLink to="/app/profile">
            {({ isActive }) => (
              <span
                className={
                  isActive
                    ? "text-amber-500 cursor-pointer"
                    : "text-[#000] cursor-pointer"
                }
              >
                Perfil
              </span>
            )}
          </NavLink>
        </div>
        <button
          onClick={logout}
          className=" text-[#000] py-2 cursor-pointer disabled:opacity-50"
        >
          Logout
        </button>
      </div>
      <div className="top-[70px] relative z-0">
        {Outlet({}) ? <Outlet /> : <ErrorPage />}
      </div>
    </div>
  );
};

export default Layout;
