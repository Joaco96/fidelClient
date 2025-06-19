import { userService } from "../api/userService";
import useFetch from "../hooks/useFetch";
import { JwtPayload } from "../types/jwtPayload";
import { NumberFormatter } from "../utils/numberFormatter";

const UserPoints = ({ userData }: { userData: JwtPayload | null }) => {
  const { response: userPointsResponse } = useFetch({
    service: userData
      ? () => userService.getUserPoints(userData.userId)
      : undefined,
  });

  return (
    <div className="px-4 pt-3 pb-4 rounded-lg bg-white flex flex-col shadow-sm">
      <p className="text-[#515838] font-medium">Balance disponible</p>
      <h6 className="text-end text-4xl font-bold text-[#FC6F2F]">
        {userPointsResponse ? NumberFormatter.format(userPointsResponse.points_balance) : "-"}
      </h6>
    </div>
  );
};

export default UserPoints;
