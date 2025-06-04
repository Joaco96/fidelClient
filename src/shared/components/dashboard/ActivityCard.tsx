import { Activity } from "../../types/Activity.interface";
import { ActivityOptions, formatDate } from "../../utils/formatDate";

const ActivityCard = ({ item }: { item: Activity }) => {
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
};

export default ActivityCard;
