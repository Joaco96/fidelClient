import { Link } from "react-router";
import { Reward } from "../../../entitites/Reward";
import { NumberFormatter } from "../../utils/numberFormatter";

const RewardCard = ({ reward }: { reward: Reward }) => {
  const rewardStockPositive = reward.stock_balance > 0;

  return (
    <Link
      to={`/app/rewards/checkout/${reward.id}`}
      className={`border-1 overflow-hidden w-full  rounded-lg bg-[#1a1a1a] ${
        !rewardStockPositive
          ? "pointer-events-none border-[#f00f0060]"
          : "border-white"
      }`}
    >
      <img src="/mock-reward.png" alt={reward.name} className="h-[200px] w-full object-cover object-center" />
      <div className="p-5">
        <span>{reward.id}</span>
        <h2 className="font-bold text-xl pb-2">{reward.name}</h2>
        <p>{reward.description}</p>
        <h4>Costo: {NumberFormatter.format(reward.points_cost)} puntos</h4>
        <h5>Stock: {reward.stock_balance} beneficios</h5>
      </div>
    </Link>
  );
};

export default RewardCard;
