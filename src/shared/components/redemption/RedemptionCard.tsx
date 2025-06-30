import { Link } from "react-router";
import { redemptionService } from "../../api/redemptionService";
import useFetch from "../../hooks/useFetch";
import { ActivityOptions, formatDate } from "../../utils/formatDate";
import ErrorPage from "../../../pages/ErrorPage";

const RedemptionCard = ({ redemptionId }: { redemptionId?: string }) => {
  const { response: redemption, isPending } = useFetch({
    service: redemptionId
      ? () => redemptionService.getRedemptionsById(redemptionId)
      : undefined,
  });

  return redemption ? (
    <div className="flex flex-col gap-8 max-w-[70vw] m-auto py-8">
      <div className="flex flex-col gap-4 bg-white rounded-lg shadow-sm p-6">
        <div className="flex">
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">ID canje</h4>
            <p>{redemption?.[0].id}</p>
          </div>
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Estado</h4>
            {redemption?.[0].is_delivered ? (
              <p className="text-green-500">Entregado</p>
            ) : (
              <p className="text-orange-500 font-medium">No entregado</p>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Fecha</h4>
            <p>{formatDate(redemption?.[0].createdAt, ActivityOptions)}</p>
          </div>
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Cantidad</h4>
            <p>{redemption?.[0].quantity}</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Beneficio</h4>
            <p>{redemption?.[0].reward.name}</p>
          </div>
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Descripcion</h4>
            <p>{redemption?.[0].reward.description}</p>
          </div>
        </div>
        <div className="mt-10">
          <h5 className="w-full text-center">
            Mostra este codigo QR en Informaciones para poder reclamar tu
            beneficio.
          </h5>
          <div className="px-8 pt-8 bg-[#f3f3f3] w-fit flex flex-col items-center justify-center m-auto mt-4 rounded-lg">
            <img
              src={redemption?.[0].qr_code}
              alt="Codigo Qr del canje"
              className="brightness-95"
            />
            <p className="w-fit text-gray-700 pb-8 text-sm">
              Valido hasta: Sin venicimiento
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#FFE9D1] p-5 rounded-lg flex flex-col gap-4">
        <h5 className="text-xl font-epiBold">Reclama tu beneficio</h5>
        <div className="flex gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[2px]"
          >
            <g clip-path="url(#clip0_112_95)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.2587 5.99125C15.7467 6.47937 15.7467 7.27063 15.2587 7.75875L9.00875 14.0087C8.52063 14.4967 7.72937 14.4967 7.24125 14.0087L4.74125 11.5087C4.26753 11.0183 4.27431 10.2386 4.75648 9.75648C5.23864 9.27431 6.01828 9.26753 6.50875 9.74125L8.125 11.3575L13.4913 5.99125C13.9794 5.50327 14.7706 5.50327 15.2587 5.99125V5.99125Z"
                fill="#4D4D4D"
              />
            </g>
            <rect
              x="1"
              y="1"
              width="18"
              height="18"
              rx="3"
              stroke="#FC6F2F"
              stroke-width="2"
            />
            <defs>
              <clipPath id="clip0_112_95">
                <rect width="20" height="20" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div>
            <h6 className="font-medium">Ubicación de canje</h6>
            <p>Av. Centro comercial 2333, Quilmes Oeste, Buenos Aires.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[2px]"
          >
            <g clip-path="url(#clip0_112_95)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.2587 5.99125C15.7467 6.47937 15.7467 7.27063 15.2587 7.75875L9.00875 14.0087C8.52063 14.4967 7.72937 14.4967 7.24125 14.0087L4.74125 11.5087C4.26753 11.0183 4.27431 10.2386 4.75648 9.75648C5.23864 9.27431 6.01828 9.26753 6.50875 9.74125L8.125 11.3575L13.4913 5.99125C13.9794 5.50327 14.7706 5.50327 15.2587 5.99125V5.99125Z"
                fill="#4D4D4D"
              />
            </g>
            <rect
              x="1"
              y="1"
              width="18"
              height="18"
              rx="3"
              stroke="#FC6F2F"
              stroke-width="2"
            />
            <defs>
              <clipPath id="clip0_112_95">
                <rect width="20" height="20" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div>
            <h6 className="font-medium">Período de validez</h6>
            <p>Sin vencimiento.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[2px]"
          >
            <g clip-path="url(#clip0_112_95)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.2587 5.99125C15.7467 6.47937 15.7467 7.27063 15.2587 7.75875L9.00875 14.0087C8.52063 14.4967 7.72937 14.4967 7.24125 14.0087L4.74125 11.5087C4.26753 11.0183 4.27431 10.2386 4.75648 9.75648C5.23864 9.27431 6.01828 9.26753 6.50875 9.74125L8.125 11.3575L13.4913 5.99125C13.9794 5.50327 14.7706 5.50327 15.2587 5.99125V5.99125Z"
                fill="#4D4D4D"
              />
            </g>
            <rect
              x="1"
              y="1"
              width="18"
              height="18"
              rx="3"
              stroke="#FC6F2F"
              stroke-width="2"
            />
            <defs>
              <clipPath id="clip0_112_95">
                <rect width="20" height="20" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div>
            <h6 className="font-medium">Nota importante</h6>
            <p>
              Por favor trae el DNI de la persona dueña de la cuenta que canjeo
              el beneficio.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="#"
          className="font-medium py-2 cursor-pointer bg-[#e9e9e9] hover:bg-[#dbdbdb] w-1/2 text-center rounded-lg text-[#515838]"
        >
          Descargar comprobante
        </Link>
        <Link
          to="/app/rewards"
          className=" text-[#515838] font-medium py-2 bg-white cursor-pointer disabled:opacity-50 border-1 border-[#ccc] rounded-lg w-1/2 text-center"
        >
          Volver a beneficios
        </Link>
      </div>
    </div>
  ) : isPending ? (
    <div className="h-[150px] max-w-[70vw] m-auto flex justify-center items-center pb-4 font-medium text-lg">Cargando canje...</div>
  ) : (
    <ErrorPage />
  );
};

export default RedemptionCard;
