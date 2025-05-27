import { userService } from "../api/userService";
import useFetch from "../hooks/useFetch";
import { JwtPayload } from "../types/jwtPayload";

const UserPoints = ({ userData }: { userData: JwtPayload | null }) => {
  const { response: userPointsResponse } = useFetch({
    service: userData
      ? () => userService.getUserPoints(userData.userId)
      : undefined,
  });

  return (
    <div className="px-4 pt-3 pb-4 rounded-lg bg-[#1A1A1A] flex flex-col">
      <p>Balance disponible</p>
      <h6 className="text-end text-4xl font-bold">
        {userPointsResponse ? userPointsResponse.points_balance : "-"}
      </h6>
    </div>
  );
};

export default UserPoints;
