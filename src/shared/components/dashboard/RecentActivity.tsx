import { Link } from "react-router";
import { Activity } from "../../types/Activity.interface";
import ActivityCard from "./ActivityCard";

const RecentActivity = ({
  activities,
  profile = false,
}: {
  activities: Activity[];
  profile?: boolean;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center max-w-[70vw] w-full m-auto">
        <h1 className="text-2xl font-epiBold">
          {profile ? "Historial de puntos" : "Actividad reciente"}
        </h1>
        {profile ? (
          ""
        ) : (
          <Link to="/app/profile" className="h-[45px] text-white py-2">
            Ver todos
          </Link>
        )}
      </div>
      <div className="pb-4 flex flex-col items-center w-full max-w-[70vw] m-auto gap-6">
        {activities.length ? (
          activities.map((item) => {
            return item.navLink ? (
              <Link to={item.navLink} className="w-full">
                <ActivityCard item={item} />
              </Link>
            ) : (
              <ActivityCard item={item} />
            );
          })
        ) : (
          <h4 className="py-6">No tienes actividad que mostrar</h4>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
