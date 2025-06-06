import { Link } from "react-router";
import { Reward } from "../../entitites/Reward";

const RewardCard = ({ reward }: { reward: Reward }) => {
  const rewardStockPositive = reward.stock_balance > 0;

  return (
    <Link
      to={`/app/rewards/checkout/${reward.id}`}
      className={`p-4 border-1 w-full  rounded-lg bg-[#1a1a1a] ${!rewardStockPositive ? "pointer-events-none border-[#f00f0060]" : "border-white"}`}
    >
      <span>{reward.id}</span>
      <h2 className="font-bold text-xl pb-2">{reward.name}</h2>
      <p>{reward.description}</p>
      <h4>Costo: {reward.points_cost} puntos</h4>
      <h5>Stock: {reward.stock_balance} beneficios</h5>
    </Link>
  );
};

export default RewardCard;
