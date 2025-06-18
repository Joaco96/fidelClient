import { Link } from "react-router";
import { Reward } from "../../../entitites/Reward";
import { NumberFormatter } from "../../utils/numberFormatter";
import { RoleIds } from "../../../entitites/Role";

const RewardCard = ({
  reward,
  userRole,
}: {
  reward: Reward;
  userRole: number;
}) => {
  const rewardStockPositive = reward.stock_balance > 0;

  return (
    <div
      className={`border-1 h-fit overflow-hidden relative w-full rounded-lg bg-[#1a1a1a] ${
        !rewardStockPositive
          ? "border-[#f00f0060]"
          : "border-white hover:border-amber-500 group"
      }`}
    >
      {userRole >= RoleIds.ADMIN ? (
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
          <Link
            to={`/app/rewards/edit/${reward.id}`}
            className=" bg-amber-500 hover:bg-amber-600 flex text-sm rounded-md px-[20px] pt-[5px] pb-[5px] w-fit z-20"
          >
            Editar
          </Link>
          {!rewardStockPositive ? (
            <div className="bg-[#f00f00] flex text-sm rounded-md px-[20px] pt-[5px] pb-[5px] w-fit z-20">
              Sin stock
            </div>
          ) : null}
        </div>
      ) : !rewardStockPositive ? (
        <div className="absolute top-2 right-2 bg-[#f00f00] flex text-sm rounded-md px-[20px] pt-[5px] pb-[5px] w-fit z-20">
          Sin stock
        </div>
      ) : null}
      <Link
        to={`/app/rewards/checkout/${reward.id}`}
        className={` ${!rewardStockPositive ? "pointer-events-none " : ""}`}
      >
        <div className="h-[200px] w-full overflow-hidden z-2">
          <img
            src="/mock-reward.png"
            alt={reward.name}
            className="w-full object-cover object-center group-hover:scale-[104%] transition-all duration-400"
          />
        </div>
        <div className="p-5">
          <span>{reward.id}</span>
          <h2 className="font-bold text-xl pb-2 group-hover:text-amber-500">
            {reward.name}
          </h2>
          <p className="tres-lineas">{reward.description}</p>
          <h4>Costo: {NumberFormatter.format(reward.points_cost)} puntos</h4>
          <h5>Stock: {reward.stock_balance} beneficios</h5>
        </div>
      </Link>
    </div>
  );
};

export default RewardCard;
