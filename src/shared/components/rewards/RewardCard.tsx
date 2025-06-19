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
      className={`border-1 h-fit overflow-hidden relative w-full rounded-lg bg-white shadow-sm ${
        !rewardStockPositive ? "border-[#f00f0060]" : "border-white hover:border-[#FC6F2F] group"
      }`}
    >
      {userRole >= RoleIds.ADMIN ? (
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
          <Link
            to={`/app/rewards/edit/${reward.id}`}
            className=" bg-[#FC6F2F] hover:bg-[#db4500] text-white flex text-sm rounded-md px-[20px] pt-[5px] pb-[5px] w-fit z-20"
          >
            Editar
          </Link>
          {!rewardStockPositive ? (
            <div className="bg-[#f00f00] text-white flex text-sm rounded-md px-[20px] pt-[5px] pb-[5px] w-fit z-20">
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
            className="w-full h-full object-cover object-center group-hover:scale-[104%] transition-all duration-400"
          />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg group-hover:text-[#FC6F2F] ">
              {reward.name}
            </h2>
            <h4 className="text-[#FC6F2F] text-xl font-bold">
              {NumberFormatter.format(reward.points_cost)} pts
            </h4>
          </div>
          <div>
            <p className="tres-lineas font-medium text-gray-700">{reward.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <h6 className="font-medium text-gray-500">Shopping</h6>
            <h5 className="font-medium text-gray-500">En stock: {reward.stock_balance}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RewardCard;
