import { useAuth } from "../../app/providers/AuthProvider";
import useFetch from "./useFetch";
import { ticketService } from "../api/ticketService";
import { redemptionService } from "../api/redemptionService";
import { Activity } from "../types/Activity.interface";
import { NumberFormatter } from "../utils/numberFormatter";

const useActivities = () => {
  const { userData } = useAuth();
  const { response: tickets } = useFetch({
    service: userData
      ? () => ticketService.getTicketsByUserId(userData.userId)
      : undefined,
  });
  const { response: redemptions } = useFetch({
    service: userData
      ? () => redemptionService.getRedemptionsByUserId(userData.userId)
      : undefined,
  });
  const ticketsActivity: Activity[] | undefined = tickets?.map((ticket) => {
    return {
      id: ticket.id,
      title: "Comprobante entregado",
      primaryDescription: ticket.store.name,
      secondaryDescription: `$${NumberFormatter.format(ticket.amount_spent)}`,
      pointsUsed: `+${NumberFormatter.format(ticket.points_earned)} pts`,
      date: ticket.createdAt,
    };
  });

  const redemptionsActivity: Activity[] | undefined = redemptions?.map(
    (redemption) => {
      return {
        id: redemption.id,
        title: "Beneficio canjeado",
        primaryDescription: redemption.reward.name,
        secondaryDescription: (redemption.is_delivered ? "Entregado" : "No entregado"),
        pointsUsed: `-${NumberFormatter.format(redemption.reward.points_cost * redemption.quantity)} pts`,
        date: redemption.createdAt,
        navLink: `/app/redemptions/${redemption.id}`,
      };
    }
  );

  const sortedActivities = [
    ...(ticketsActivity ?? []),
    ...(redemptionsActivity ?? []),
  ].sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });

  return {
    sortedActivities,
    tickets,
    redemptions,
  };
};

export default useActivities;
