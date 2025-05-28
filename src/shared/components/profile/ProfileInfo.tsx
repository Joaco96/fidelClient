import { Redemption } from "../../../entitites/Redemption";
import { Ticket } from "../../../entitites/Ticket";
import { JwtPayload } from "../../types/jwtPayload";

const ProfileInfo = ({
  userData,
  tickets,
  redemptions,
}: {
  userData: JwtPayload | null;
  tickets: Ticket[] | null;
  redemptions: Redemption[] | null;
}) => {
  let totalSpent = 0;
  let totalPoints = 0;
  tickets?.map((ticket) => {
    totalSpent += ticket.amount_spent;
    totalPoints += ticket.points_earned;
  });

  return (
    <div className="max-w-[70vw] flex flex-col w-full m-auto gap-6 pb-8">
      <div className="flex w-full gap-6">
        <div className="p-3 border-1 border-white rounded-lg w-1/3">
          <h4 className="font-medium">Total gastado</h4>
          <p className="text-3xl font-bold">${totalSpent}</p>
          <p className="text-sm">En tiendas adheridas</p>
        </div>
        <div className="p-3 border-1 border-white rounded-lg w-1/3">
          <h4 className="font-medium">Beneficios reclamados</h4>
          <p className="text-3xl font-bold">
            {redemptions?.length ? redemptions?.length : "-"}
          </p>
          <p className="text-sm">Beneficios</p>
        </div>
        <div className="p-3 border-1 border-white rounded-lg w-1/3">
          <h4 className="font-medium">Nivel obtenido</h4>
          <p className="text-3xl font-bold">{totalPoints}</p>
          <p className="text-sm">Puntos</p>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex p-3 flex-col border-1 w-1/2 border-white rounded-lg">
          <h4 className="text-2xl pb-2 font-epiBold">Informacion personal</h4>
          <div>
            <h5 className=" text-[#ccc]">ID</h5>
            <p className="pb-2 text-lg">{userData?.userId}</p>
            <h5 className=" text-[#ccc]">Email</h5>
            <p className="pb-2 text-lg">{userData?.email}</p>
            <h5 className=" text-[#ccc]">DNI</h5>
            <p className="text-lg">{userData?.dni}</p>
          </div>
        </div>
        <div className="flex p-3 flex-col border-1 w-1/2 border-white rounded-lg">
          <h4 className="text-2xl pb-2 font-epiBold">
            Preferencias y Seguridad
          </h4>
          <div className="flex flex-col items-center mt-4">
            <button className=" text-[#ccc] py-2 cursor-pointer disabled:opacity-50 border-1 border-[#ccc] w-full rounded-lg">
              Cambiar contraseña
            </button>
            <button className=" text-[#f00] py-2 cursor-pointer disabled:opacity-50">
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
