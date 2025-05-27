import { JwtPayload } from "../../types/jwtPayload";
import { formatDate, ProfileOptions } from "../../utils/formatDate";
import UserPoints from "../UserPoints";

const ProfileHero = ({ userData }: { userData: JwtPayload | null }) => {
  const userName = userData?.name;

  return (
    <div className="max-w-[70dvw] m-auto bg-[#363636] rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="bg-[#000] rounded-full w-24 h-24 flex justify-center items-center font-bold text-5xl">
            <span className="pb-1">
              {userData?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-medium pb-1">{userName}</h3>
            <p>
              Miembro desde{" "}
              {userData?.createdAt
                ? formatDate(userData?.createdAt, ProfileOptions)
                : "-"}
            </p>
            <div className="bg-[#000] flex text-sm rounded-2xl px-[14px] pt-[3px] pb-[4px]">
              {userData?.role === 1
                ? "Usuario"
                : userData?.role === 2
                ? "Empleado"
                : "Administrador"}
            </div>
          </div>
        </div>
        <UserPoints userData={userData} />
      </div>
    </div>
  );
};

export default ProfileHero;
