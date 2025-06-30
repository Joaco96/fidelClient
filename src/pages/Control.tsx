import { Link, useNavigate, useParams } from "react-router";
import { redemptionService } from "../shared/api/redemptionService";
import { ActivityOptions, formatDate } from "../shared/utils/formatDate";
import useFetch from "../shared/hooks/useFetch";
import ErrorPage from "./ErrorPage";
import { useConfirmModal } from "../shared/hooks/useConfirmModal";
import { toast } from "sonner";
import { decodeJWT } from "../shared/utils/decodeJwt";
import { JwtRedemptionPayload } from "../shared/types/jwtPayload";

const Control = () => {
  const { redemption_jwt } = useParams();
  const redemptionId = redemption_jwt ? decodeJWT<JwtRedemptionPayload>(redemption_jwt)?.id : "";
  const navigate = useNavigate();
  const { response: redemption, isPending } = useFetch({
    service: redemptionId
      ? () => redemptionService.getRedemptionsById(redemptionId)
      : undefined,
  });

  const {
    serviceCall: updateRedemptionStatus,
    isPending: updateApiResponse,
    handleApiResponse,
  } = useFetch({
    service: redemptionService.updateRedemptionStatus,
    fetchOnRender: false,
  });

  const { openModal, ConfirmModalComponent } = useConfirmModal();

  const handleUpdateRedemptionStatus = () => {
    openModal({
      title: "Cambiar estado",
      message: "Esta acción cambiara el estado permanentemente.",
      children: null,
      onConfirm: async () => {
        if (redemptionId) {
          const data = await updateRedemptionStatus({
            id: redemptionId,
            is_delivered: "true",
          });
          handleApiResponse(data);
          if (data.response) {
            toast.success("Estado del canje modificado con éxito");
            navigate(`/app/redemptions/${redemptionId}`);
          }
        }
      },
    });
  };
console.log(redemption?.[0].is_delivered)
  return redemption ? (
    <div className="flex flex-col gap-2 md:gap-8 px-4 md:px-0 md:max-w-[70vw] m-auto py-8">
      {ConfirmModalComponent}
      <div className="flex justify-between md:items-center md:flex-row flex-col-reverse">
        <div className="flex items-center justify-start gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-epiBold pt-2">Control canje</h3>
          </div>
        </div>
        <Link
          to="/app/profile"
          className="font-medium hover:underline text-[#515838] text-end"
        >
          Vovler al perfil
        </Link>
      </div>
      <div className="flex flex-col gap-4 bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0">
          <div className="md:w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">ID canje</h4>
            <p>{redemption?.[0].id}</p>
          </div>
          <div className="md:w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Estado</h4>
            {redemption?.[0].is_delivered ? (
              <p className="text-green-500">Entregado</p>
            ) : (
              <p className="text-orange-500 font-medium">No entregado</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-0">
          <div className="md:w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Fecha</h4>
            <p>{formatDate(redemption?.[0].createdAt, ActivityOptions)}</p>
          </div>
          <div className="md:w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Cantidad</h4>
            <p>{redemption?.[0].quantity}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-0">
          <div className="md:w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Beneficio</h4>
            <p>{redemption?.[0].reward.name}</p>
          </div>
          <div className="md:w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Descripcion</h4>
            <p>{redemption?.[0].reward.description}</p>
          </div>
        </div>
        {!redemption?.[0].is_delivered ? (
          <div className="md:mt-10 flex flex-col items-start">
            <button
              disabled={updateApiResponse}
              onClick={handleUpdateRedemptionStatus}
              className="font-medium py-2 cursor-pointer bg-[#515838] hover:bg-[#484e32] disabled:opacity-50 w-full text-center h-fit rounded-lg flex justify-center text-white mt-2"
            >
              {isPending ? "Cambiando..." : "Cambiar estado de entrega"}
            </button>
            <h5 className="w-full text-start mt-2">
              Verifica los datos del usuario y marca el estado como entregado.
            </h5>
          </div>
        ) : null}
      </div>
    </div>
  ) : isPending ? (
    <div className="h-[150px] max-w-[70vw] m-auto flex justify-center items-center pb-4 font-medium text-lg">
      Cargando canje...
    </div>
  ) : (
    <ErrorPage />
  );
};

export default Control;
