import { Link } from "react-router";
import { Reward } from "../../../entitites/Reward";
import RewardsLayout from "../rewards/RewardsLayout";

const FeaturedRewards = ({ rewards }: { rewards: Reward[] | null }) => {
  return (
    <>
      <div className="flex flex-col justify-between items-start w-full m-auto mb-2">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-2xl font-epiBold">Beneficios Destacados</h1>
          <Link to="/app/rewards" className="h-[45px] text-white py-2">
            Ver todos
          </Link>
        </div>
        <RewardsLayout rewards={rewards} />
      </div>
    </>
  );
};

export default FeaturedRewards;
