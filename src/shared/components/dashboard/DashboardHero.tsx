import { Link } from "react-router";
import { useAuth } from "../../../app/providers/AuthProvider";
import UserPoints from "../UserPoints";
import { RoleIds } from "../../../entitites/Role";

const DashboardHero = () => {
  const { userData } = useAuth();
  const userRole = userData ? userData?.role : 0;

  const userName = userData?.name;
  return (
    <div className="pb-10 bg-[#FFE9D1] pt-10 mb-6 gap-6 flex flex-col w-full shadow-sm">
      <div className="max-w-[70dvw] m-auto flex justify-between items-center w-full">
        <div>
          <h3 className="text-3xl font-epiBold text-[#515838]">
            Hola <span className="capitalize">{userName}</span>!
          </h3>
          <p className="text-[#515838] text-lg">Explora los beneficios y canjea con tus puntos hoy.</p>
        </div>
        <UserPoints userData={userData} />
      </div>
      {userRole >= RoleIds.EMPLOYEE ? (
        <div className="gap-4 flex flex-col max-w-[70dvw] w-full m-auto justify-between items-center">
          <div className="p-4 bg-[#ffffff] rounded-lg w-full flex gap-4 justify-between items-center shadow-sm">
            <div>
              <h3 className="text-lg leading-6 font-medium text-[#515838]">
                Agregá un nuevo comprobante de compra
              </h3>
              <p className="text-gray-500 ">
                Ingresando el valor de la compra y el numero de comprobante.
              </p>
            </div>
            <Link
              to={"/app/ticket"}
              className="cursor-pointer p-2 h-10 bg-[#FC6F2F] hover:bg-[#db4500] rounded-lg text-white"
            >
              Nuevo ticket
            </Link>
          </div>
          {userRole >= RoleIds.ADMIN ? (
          <div className="p-4 bg-[#ffffff] rounded-lg w-full flex gap-4 justify-between items-center shadow-sm">
            <div>
              <h3 className="text-lg leading-6 font-medium text-[#515838]">
                Agregá un nuevo beneficio para los usuarios
              </h3>
              <p className="text-gray-500">
                Ingresando el valor de la compra y el numero de comprobante.
              </p>
            </div>
            <Link
              to={"/app/rewards/new"}
              className="cursor-pointer p-2 h-10 bg-[#FC6F2F] hover:bg-[#db4500] rounded-lg text-white"
            >
              Nuevo Beneficio
            </Link>
          </div>) : null}
        </div>
      ) : null}
    </div>
  );
};

export default DashboardHero;
