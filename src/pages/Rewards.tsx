import { useMemo } from "react";
import { useAuth } from "../app/providers/AuthProvider";
import { rewardService } from "../shared/api/rewardService";
import UserPoints from "../shared/components/UserPoints";
import useFetch from "../shared/hooks/useFetch";
import RewardsLayout from "../shared/components/rewards/RewardsLayout";

const Rewards = () => {
  const { userData } = useAuth();
  const { response: rewardResponse } = useFetch({
    service: rewardService.getRewards,
  });

  const featuredRewards = useMemo(
    () =>
      rewardResponse
        ?.sort((a, b) => (a.points_cost < b.points_cost ? 1 : -1))
        .slice(0, 2),
    [rewardResponse]
  );
  const rewards = useMemo(
    () => rewardResponse?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [rewardResponse]
  );

  return (
    <div className="max-w-[70dvw] m-auto rounded-lg mb-6 relative top-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-epiBold">Beneficios</h3>
            <p>Buscá y canjeá beneficios con tus puntos disponibles.</p>
          </div>
        </div>
        <UserPoints userData={userData} />
      </div>
      <div className="flex flex-col justify-between items-start m-auto p-4 bg-amber-800 rounded-lg mt-5">
        <h1 className="text-xl font-epiBold pb-3">Beneficios destacados</h1>
        <RewardsLayout rewards={featuredRewards ?? null} />
      </div>
      <div className="mt-8">
        <RewardsLayout rewards={rewards ?? null} />
      </div>
    </div>
  );
};

export default Rewards;
