import { NavLink } from "react-router";
import LogoSvg from "../shared/components/LogoSvg";
import { useAuth } from "../app/providers/AuthProvider";

const Landing = () => {
  const { userData } = useAuth();

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between py-3 px-8 bg-white text-white fixed z-2 h-[70px]">
        <NavLink to="/" className={"w-1/4"}>
          <LogoSvg />
        </NavLink>
        <div className="flex items-center text-[#000] gap-4">
          <NavLink to="/app/rewards">
            <span className="text-[#000]">Beneficios</span>
          </NavLink>
          <NavLink to="/">
            <span className="text-[#000]">Empresas</span>
          </NavLink>
        </div>
        {userData ? (
          <div className="cursor-pointer flex gap-4 w-1/4 justify-end items-center">
            <NavLink to="/app/profile">
              <div className="flex items-center justify-center gap-2">
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
            <NavLink
              to="/app/dashboard"
              className={"bg-amber-600 py-2 px-6 rounded-lg text-white"}
            >
              Ingresar
            </NavLink>
          </div>
        ) : (
          <div className="cursor-pointer flex gap-4 w-1/4 justify-end items-center">
            <NavLink to="/login" className={"text-[#000]"}>
              Iniciar sesion
            </NavLink>
            <NavLink
              to="/register"
              className={"bg-amber-600 py-2 px-6 rounded-lg text-white"}
            >
              Unite
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
