import { Link } from "react-router";
import { rewardService } from "../shared/api/rewardService";
import useFetch from "../shared/hooks/useFetch";
import DashboardHero from "../shared/components/dashboard/DashboardHero";
import FeaturedRewards from "../shared/components/dashboard/FeaturedRewards";
import RecentActivity from "../shared/components/dashboard/RecentActivity";
import useActivities from "../shared/hooks/useActivities";
import { ActivityOptions, formatDate } from "../shared/utils/formatDate";
import { useMemo } from "react";
import { useAuth } from "../app/providers/AuthProvider";

const MAX_RECENT_ACTIVITIES = 4;

const Dashboard = () => {
  const { userData } = useAuth();
  const userRole = userData ? userData?.role : 0;
  const { response: rewardResponse } = useFetch({
    service: rewardService.getRewards,
  });
  const rewardsQuantity = rewardResponse?.length;
  const { sortedActivities } = useActivities();

  const formattedDate = sortedActivities.length
    ? formatDate(sortedActivities[0]?.date, ActivityOptions)
    : "-";

  const featuredRewards = useMemo(
    () =>
      rewardResponse
        ?.sort((a, b) => (a.points_cost < b.points_cost ? 1 : -1))
        .slice(0, 2),
    [rewardResponse]
  );

  return (
    <>
      <DashboardHero />
      <div className="flex flex-col gap-12 max-w-[70vw] m-auto">
        <div className="flex justify-between items-center w-full gap-6">
          <Link
            to="/app/profile"
            className="w-1/2 p-3 border-1 border-white rounded-lg hover:bg-gray-900"
          >
            <h4 className="text-lg font-medium">Historial de puntos</h4>
            <p>Ver tus transacciones recientes</p>
            <p>
              Ultima actividad:
              <span> {formattedDate}</span>
            </p>
          </Link>
          <Link
            to="/app/rewards"
            className="w-1/2 p-3 border-1 border-white rounded-lg hover:bg-gray-900"
          >
            <h4 className="text-lg font-medium">Reclamar beneficios</h4>
            <p>Ver beneficios destacados</p>
            <p>
              <span>{rewardsQuantity ? rewardsQuantity : "-"} </span>nuevos
              disponibles
            </p>
          </Link>
        </div>
        <FeaturedRewards rewards={featuredRewards ?? null} userRole={userRole}/>
        <RecentActivity
          activities={sortedActivities.slice(0, MAX_RECENT_ACTIVITIES)}
        />
      </div>
    </>
  );
};

export default Dashboard;
