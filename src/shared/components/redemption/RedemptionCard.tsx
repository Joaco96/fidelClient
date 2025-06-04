import { redemptionService } from "../../api/redemptionService";
import useFetch from "../../hooks/useFetch";

const RedemptionCard = ({ redemptionId }: { redemptionId?: string }) => {
  const { response: redemption, isPending } = useFetch({
    service: redemptionId
      ? () => redemptionService.getRedemptionsById(redemptionId)
      : undefined,
  });

  return redemption ? (
    <div>
      {redemption?.[0].id}
      <img src={redemption?.[0].qr_code} alt="" />
    </div>
  ) : isPending ? (
    <p>Cargando canje...</p>
  ) : (
    <p>Canje no encontrado</p>
  );
};

export default RedemptionCard;
