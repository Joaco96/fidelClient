import { Link } from "react-router";
import { Reward } from "../../../entitites/Reward";

const FeaturedRewards = ({ rewards }: { rewards: Reward[] | null }) => {

  return (
    <>
      <div className="flex justify-between items-center max-w-[70dvw] m-auto mb-2">
        <h1 className="text-2xl font-epiBold">Beneficios disponibles</h1>
        <Link
          to="/app/rewards"
          className="h-[45px] text-white py-2"
        >
          Ver todos
        </Link>
      </div>
      <div className="flex gap-6 max-w-[70dvw] m-auto mb-10">
        {rewards
          ? rewards.map((item) => {
              return (
                <div className="p-4 border-1 w-1/2 border-white rounded-lg bg-[#1a1a1a]" key={item.id}>
                <span>{item.id}</span>
                  <h2 className="font-bold text-xl pb-2">{item.name}</h2>
                  <p>{item.description}</p>
                  <h4>Costo: {item.points_cost} puntos</h4>
                  <h5>Stock: {item.stock_balance} beneficios</h5>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default FeaturedRewards;
