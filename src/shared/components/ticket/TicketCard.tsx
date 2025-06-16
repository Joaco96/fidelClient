import { Ticket } from "../../../entitites/Ticket";
import useFetch from "../../hooks/useFetch";
import { userService } from "../../api/userService";
import { formatDate, TicketOptions } from "../../utils/formatDate";

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const user_id = ticket.user_id;

  const { response: user } = useFetch({
    service: () => userService.getUserById(user_id),
  });

  return (
    <div>
      <div className="w-full flex justify-between pb-2">
        <div className="flex items-center justify-center gap-3 pr-4">
          <div className="bg-[#000] rounded-full w-8 h-8 flex justify-center items-center font-bold text-2xl">
            <span className="font-epiBold pt-2">
              {user?.[0].name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="capitalize leading-4 font-medium">
              {user?.[0].name}
            </h3>
            <h3 className="text-sm leading-4">Comprobante #{ticket.id}</h3>
          </div>
        </div>
        <div className="flex items-center">
          <p className="font-medium text-amber-600">
            +{ticket.points_earned} pts
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
