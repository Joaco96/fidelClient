import { Activity } from "../../types/Activity.interface";
import { ActivityOptions, formatDate } from "../../utils/formatDate";

const ActivityCard = ({ item }: { item: Activity }) => {
  return (
    <div
      className="flex w-full justify-between border-1 border-white rounded-lg bg-white p-4 shadow-sm"
      key={item.id}
    >
      <div className="flex flex-col w-[60%]">
        <h5 className="font-medium text-lg">{item.title}</h5>
        <div className="flex tres-lineas font-medium text-gray-500">
          <p>{`${item.primaryDescription} - ${item.secondaryDescription}`}</p>
        </div>
      </div>
      <div className="flex flex-col items-end w-[40%]">
        <p className={`font-medium text-lg ${item.title === "Comprobante entregado" ? "text-[#FC6F2F]" : ""}`}>{item.pointsUsed}</p>
        <p className="font-medium text-gray-500">{formatDate(item.date, ActivityOptions)}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
