import { useMemo } from "react";
import { useAuth } from "../app/providers/AuthProvider";
import { rewardService } from "../shared/api/rewardService";
import UserPoints from "../shared/components/UserPoints";
import useFetch from "../shared/hooks/useFetch";
import RewardsLayout from "../shared/components/rewards/RewardsLayout";
import { Link } from "react-router";
import { RoleIds } from "../entitites/Role";

const Rewards = () => {
  const { userData } = useAuth();
  const { response: rewardResponse } = useFetch({
    service: rewardService.getRewards,
  });
  const userRole = userData ? userData?.role : 0;

  const rewards = useMemo(() => {
    if (!rewardResponse) return [];
    const newArray = [...rewardResponse]
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .filter((reward) => {
        if (userRole >= RoleIds.ADMIN) {
          return true;
        } else {
          return reward.stock_balance > 0;
        }
      });
    return newArray;
  }, [rewardResponse, userRole]);

  const featuredRewards = useMemo(() => {
    if (!rewardResponse) return [];
    const newArray = [...rewardResponse]
      .sort((a, b) => (a.points_cost < b.points_cost ? 1 : -1))
      .filter((reward) => {
        if (userRole >= RoleIds.ADMIN) {
          return true;
        } else {
          return reward.stock_balance > 0;
        }
      })
      .slice(0, 2);
    return newArray;
  }, [rewardResponse, userRole]);

  return (
    <div className="max-w-[70dvw] m-auto rounded-lg pb-8 top-5 relative pt-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            {userRole >= RoleIds.ADMIN ? (
              <>
                <h3 className="text-3xl font-epiBold pt-2">
                  Gestión de beneficios
                </h3>
                <p className="pb-2">
                  Editá y administrá los beneficios en el catalogo.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-epiBold">Beneficios</h3>
                <p>Buscá y canjeá beneficios con tus puntos disponibles.</p>
              </>
            )}
          </div>
        </div>
        {userRole >= RoleIds.ADMIN ? (
          <Link
            to={"/app/rewards/new"}
            className="cursor-pointer p-2 h-10 bg-amber-500 rounded-lg"
          >
            Nuevo Beneficio
          </Link>
        ) : (
          <UserPoints userData={userData} />
        )}
      </div>
      {userRole < RoleIds.ADMIN ? (
        <div className="flex flex-col justify-between items-start m-auto p-4 bg-amber-800 rounded-lg mt-5">
          <h1 className="text-xl font-epiBold pb-3">Beneficios destacados</h1>
          <RewardsLayout
            rewards={featuredRewards ?? null}
            userRole={userRole}
          />
        </div>
      ) : null}
      <div className="mt-8">
        <RewardsLayout rewards={rewards ?? null} userRole={userRole} />
      </div>
    </div>
  );
};

export default Rewards;
