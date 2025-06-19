import { Ticket } from "../../../entitites/Ticket";
import useFetch from "../../hooks/useFetch";
import { userService } from "../../api/userService";
import { formatDate, TicketOptions } from "../../utils/formatDate";
import { NumberFormatter } from "../../utils/numberFormatter";

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const user_id = ticket.user_id;

  const { response: user } = useFetch({
    service: () => userService.getUserById(user_id),
  });

  return (
    <div className="border-b-1 pb-4 border-[#e9e9e9]">
      <div className="w-full flex justify-between pb-2">
        <div className="flex items-center justify-center gap-3 pr-4">
          <div className="bg-[#FC6F2F] rounded-full w-10 h-10 flex justify-center items-center font-bold text-xl">
            <span className="font-bold pb-[2px] text-white">
              {user?.[0].name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="capitalize leading-5 font-medium text-lg">
              {user?.[0].name}
            </h3>
            <h3 className="leading-4 text-gray-500 font-medium">Comprobante #{ticket.id}</h3>
          </div>
        </div>
        <div className="flex items-center">
          <p className="font-medium text-[#FC6F2F] text-lg">
            +{NumberFormatter.format(ticket.points_earned)} pts
          </p>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-sm">{ticket.store.name}</p>
        <p className="text-sm capitalize">
          {formatDate(ticket.createdAt, TicketOptions)}
        </p>
      </div>
    </div>
  );
};

export default TicketCard;
