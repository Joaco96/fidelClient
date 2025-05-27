import { Link } from "react-router";
import { Activity } from "../../types/Activity.interface";
import { ActivityOptions, formatDate } from "../../utils/formatDate";

const RecentActivity = ({
  activities,
  profile = false,
}: {
  activities: Activity[];
  profile?: boolean;
}) => {
  return (
    <>
      <div className="flex justify-between items-center max-w-[70vw] w-full m-auto mb-4">
        <h1 className="text-2xl">
          {profile ? "Historial de puntos" : "Actividad reciente"}
        </h1>
        {profile ? (
          ""
        ) : (
          <Link
            to="/app/profile"
            className="h-[45px] text-white py-2 rounded hover:bg-indigo-700"
          >
            Ver todos
          </Link>
        )}
      </div>
      <div className="pb-4 flex flex-col items-center w-full max-w-[70vw] m-auto gap-6">
        {activities.length ? (
          activities.map((item) => {
            return (
              <div
                className="flex w-full justify-between border-1 border-white rounded-lg bg-[#1a1a1a] p-4"
                key={item.id}
              >
                <div className="">
                  <h5>{item.title}</h5>
                  <div className="flex">
                    <p>{`${item.primaryDescription} - ${item.secondaryDescription}`}</p>
                    <p></p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p>{item.pointsUsed}</p>
                  <p>{formatDate(item.date, ActivityOptions)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h4 className="py-6">No tienes actividad que mostrar</h4>
        )}
      </div>
    </>
  );
};

export default RecentActivity;
