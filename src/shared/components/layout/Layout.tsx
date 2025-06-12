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
        <NavLink to="/" className={"w-1/4"}>
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
        <div className="flex w-1/4 justify-end">
          {userData ? (
            <NavLink to="/app/profile">
              <div className="flex items-center justify-center gap-2 pr-4">
                <div className="bg-[#000] rounded-full w-8 h-8 flex justify-center items-center font-bold text-2xl">
                  <span className="font-epiBold pt-2">
                    {userData?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col justify-between items-start h-full gap-1">
                  <h3 className="text-[#000] capitalize">{userData.name}</h3>
                </div>
              </div>
            </NavLink>
          ) : null}
          <button
            onClick={logout}
            className=" text-[#000] cursor-pointer disabled:opacity-50"
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
