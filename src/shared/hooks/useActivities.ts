import { useAuth } from "../../app/providers/AuthProvider";
import useFetch from "./useFetch";
import { ticketService } from "../api/ticketService";
import { redemptionService } from "../api/redemptionService";
import { Activity } from "../types/Activity.interface";

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
      secondaryDescription: `$${ticket.amount_spent}`,
      pointsUsed: `+${ticket.points_earned} pts`,
      date: ticket.createdAt,
    };
  });

  const redemptionsActivity: Activity[] | undefined = redemptions?.map(
    (redemption) => {
      return {
        id: redemption.id,
        title: "Beneficio canjeado",
        primaryDescription: redemption.reward.name,
        secondaryDescription: redemption.reward.description,
        pointsUsed: `-${redemption.reward.points_cost} pts`,
        date: redemption.createdAt,
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
