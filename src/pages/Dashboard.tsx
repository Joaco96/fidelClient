import { Link } from "react-router";
import { rewardService } from "../shared/api/rewardService";
import useFetch from "../shared/hooks/useFetch";
import Hero from "../shared/components/dashboard/Hero";
import FeaturedRewards from "../shared/components/dashboard/FeaturedRewards";
import RecentActivity from "../shared/components/dashboard/RecentActivity";
import useActivities from "../shared/hooks/useActivities";
import { formatDate } from "../shared/utils/formatDate";

const MAX_RECENT_ACTIVITIES = 3;

const Dashboard = () => {
  const { response: rewardResponse } = useFetch({
    service: rewardService.getRewards,
  });
  const rewardsQuantity = rewardResponse?.length;
  const { sortedActivities } = useActivities();

  const formattedDate = sortedActivities.length ? formatDate(sortedActivities[0]?.date) : "-";

  return (
    <>
      <Hero />
      <div className="flex justify-between items-center gap-6 mb-10 max-w-[70vw] m-auto">
        <Link to="/app/profile" className="w-1/2 p-3 border-1 border-white">
          <h4>Historial de puntos</h4>
          <p>Ver tus transacciones recientes</p>
          <p>
            Ultima actividad:
            <span> {formattedDate}</span>
          </p>
        </Link>
        <Link to="/app/rewards" className="w-1/2 p-3 border-1 border-white">
          <h4>Reclamar beneficios</h4>
          <p>Ver beneficios disponibles</p>
          <p>
            <span>{rewardsQuantity} </span>nuevos disponibles
          </p>
        </Link>
      </div>
      <FeaturedRewards rewards={rewardResponse} />
      <RecentActivity
        activities={sortedActivities.slice(0, MAX_RECENT_ACTIVITIES)}
      />
    </>
  );
};

export default Dashboard;
