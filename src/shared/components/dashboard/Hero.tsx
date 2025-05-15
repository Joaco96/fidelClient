import { useAuth } from "../../../app/providers/AuthProvider";
import { userService } from "../../api/userService";
import useFetch from "../../hooks/useFetch";

const Hero = () => {
  const { userData } = useAuth();
  const { response: userPointsResponse } = useFetch({
    service: userData
      ? () => userService.getUserPoints(userData.userId)
      : undefined,
  });

  const userName = userData?.name;
  return (
    <div className="pb-12 bg-[#363636] pt-12 mb-6">
      <div className="max-w-[70dvw] m-auto flex justify-between items-center">
        <div>
          <h3 className="text-3xl font-bold">
            Hola <span className="uppercase">{userName}</span>!
          </h3>
          <p>Explora los beneficios y canjea con tus puntos hoy.</p>
        </div>
        <div className="px-4 pt-3 pb-4 rounded-lg bg-[#1A1A1A] flex flex-col">
          <p>Tus puntos</p>
          <h6 className="text-end text-4xl font-bold">
            {userPointsResponse ? userPointsResponse.points_balance : "-"}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Hero;
