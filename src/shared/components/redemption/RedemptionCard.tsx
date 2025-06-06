import { Link } from "react-router";
import { redemptionService } from "../../api/redemptionService";
import useFetch from "../../hooks/useFetch";
import { ActivityOptions, formatDate } from "../../utils/formatDate";

const RedemptionCard = ({ redemptionId }: { redemptionId?: string }) => {
  const { response: redemption, isPending } = useFetch({
    service: redemptionId
      ? () => redemptionService.getRedemptionsById(redemptionId)
      : undefined,
  });

  console.log(redemption);

  return redemption ? (
    <div className="flex flex-col gap-8 max-w-[70vw] m-auto py-8">
      <div className="flex">
        <div className="w-1/2">
          <h4 className="text-lg font-epiBold">Id</h4>
          <p>{redemption?.[0].id}</p>
          <h4 className="text-lg font-epiBold">Estado</h4>
          {redemption?.[0].is_delivered ? (
            <p className="text-green-500">Entregado</p>
          ) : (
            <p className="text-orange-500">No entregado</p>
          )}
        </div>
        <div className="w-1/2">
          <h4 className="text-lg font-epiBold">Fecha</h4>
          <p>{formatDate(redemption?.[0].createdAt, ActivityOptions)}</p>
          <h4 className="text-lg font-epiBold">Cantidad</h4>
          <p>{redemption?.[0].quantity}</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <h5 className="w-full text-center">
          Mostra este codigo QR en Informaciones para poder reclamar tu
          beneficio.
        </h5>
        <img src={redemption?.[0].qr_code} alt="" className="m-auto" />
        <div className="flex">
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold">Beneficio</h4>
            <p>{redemption?.[0].reward.name}</p>
          </div>
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold">Descripcion</h4>
            <p>{redemption?.[0].reward.description}</p>
          </div>
        </div>
      </div>
      <div className="w-full text-[#ccc] border-1 border-[#ccc] p-3 rounded-lg flex flex-col gap-2">
        <h5 className="text-lg font-epiBold">Reclama tu beneficio</h5>
        <h6 className="font-medium">Ubicación de canje</h6>
        <p>Av. Centro comercial 2333, Quilmes Oeste, Buenos Aires.</p>
        <h6 className="font-medium">Período de validez</h6>
        <p>Sin vencimiento.</p>
        <h6 className="font-medium">Nota importante</h6>
        <p>
          Por favor trae el DNI de la persona dueña de la cuenta que canjeo el
          beneficio.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/app/rewards"
          className=" text-[#ccc] py-2 cursor-pointer disabled:opacity-50 border-1 border-[#ccc] rounded-lg w-1/2 text-center"
        >
          Volver a beneficios
        </Link>
        <Link
          to="#"
          className=" bg-[#ccc] py-2 cursor-pointer disabled:opacity-50 border-1 border-[#ccc] rounded-lg w-1/2 text-center text-black"
        >
          Descargar comprobante
        </Link>
      </div>
    </div>
  ) : isPending ? (
    <p className="max-w-[70vw] m-auto text-center pt-8">Cargando canje...</p>
  ) : (
    <p className="max-w-[70vw] m-auto text-center pt-8">Canje no encontrado</p>
  );
};

export default RedemptionCard;
