import { Activity } from "../../types/Activity.interface";
import { ActivityOptions, formatDate } from "../../utils/formatDate";

const ActivityCard = ({ item }: { item: Activity }) => {
  return (
    <div
      className="flex w-full justify-between border-1 border-white rounded-lg bg-[#1a1a1a] p-4"
      key={item.id}
    >
      <div className="flex flex-col w-[60%]">
        <h5>{item.title}</h5>
        <div className="flex tres-lineas">
          <p>{`${item.primaryDescription} - ${item.secondaryDescription}`}</p>
        </div>
      </div>
      <div className="flex flex-col items-end w-[40%]">
        <p>{item.pointsUsed}</p>
        <p>{formatDate(item.date, ActivityOptions)}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
