import { roleNames } from "../../../entitites/Role";
import { JwtPayload } from "../../types/jwtPayload";
import { formatDate, ProfileOptions } from "../../utils/formatDate";
import UserPoints from "../UserPoints";

const ProfileHero = ({ userData }: { userData: JwtPayload | null }) => {
  const userName = userData?.name;

  return (
    <div className="max-w-[70dvw] m-auto bg-[#FFE9D1] rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="bg-[#515838] rounded-full w-24 h-24 flex justify-center items-center font-bold text-5xl">
            <span className="font-bold capitalize leading-9 pb-[2px] text-white">
              {userData?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col justify-between items-start h-full">
            <h3 className="text-3xl font-epiBold capitalize text-[#515838]">{userName}</h3>
            <p className="text-[#515838] pb-1">
              Miembro desde{" "}
              {userData?.createdAt
                ? formatDate(userData?.createdAt, ProfileOptions)
                : "-"}
            </p>
            <div className="bg-[#FC6F2F] flex text-sm rounded-2xl px-[14px] pt-[3px] pb-[4px] w-fit text-white">
              {userData?.role ? roleNames[userData?.role] : "..."}
            </div>
          </div>
        </div>
        <UserPoints userData={userData} />
      </div>
    </div>
  );
};

export default ProfileHero;
