import { Link } from "react-router";
import { Reward } from "../../../entitites/Reward";
import RewardsLayout from "../rewards/RewardsLayout";

const FeaturedRewards = ({
  rewards,
  userRole,
}: {
  rewards: Reward[] | null;
  userRole: number;
}) => {
  return (
    <>
      <div className="flex flex-col justify-between items-start w-full m-auto">
        <div className="flex justify-between w-full items-center pb-3">
          <h1 className="text-2xl font-epiBold">Beneficios Destacados</h1>
          <Link to="/app/rewards" className="text-[#FC6F2F] font-medium">
            Ver todos
          </Link>
        </div>
        <RewardsLayout rewards={rewards} userRole={userRole}/>
      </div>
    </>
  );
};

export default FeaturedRewards;
