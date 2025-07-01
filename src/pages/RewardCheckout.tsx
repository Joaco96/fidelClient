import { Link, useNavigate, useParams } from "react-router";
import useFetch from "../shared/hooks/useFetch";
import { rewardService } from "../shared/api/rewardService";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../app/providers/AuthProvider";
import { userService } from "../shared/api/userService";
import { redemptionService } from "../shared/api/redemptionService";
import { NumberFormatter } from "../shared/utils/numberFormatter";
import { RoleIds } from "../entitites/Role";

const RewardCheckout = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const { response: userPointsResponse } = useFetch({
    service: userData
      ? () => userService.getUserPoints(userData.userId)
      : undefined,
  });

  const { reward_id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const { response: reward } = useFetch({
    service: reward_id
      ? () => rewardService.getRewardById(reward_id)
      : undefined,
  });

  const {
    serviceCall: newRedemption,
    isPending,
    handleApiResponse,
  } = useFetch({
    service: redemptionService.newRedemption,
    fetchOnRender: false,
  });

  const balancePuntos = userPointsResponse
    ? userPointsResponse?.points_balance
    : 0;
  const puntosRequeridos = reward ? reward?.[0].points_cost * quantity : 0;
  const balanceRestante = balancePuntos - puntosRequeridos;

  const handleSubstract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.warning("Cantidad minima 1");
    }
  };

  const handleAdd = () => {
    if (!reward) return;
    if (quantity < reward?.[0].stock_balance) {
      setQuantity(quantity + 1);
    } else {
      toast.warning("Stock insuficiente");
    }
  };

  const handleNewRedemption = async () => {
    if (balanceRestante < 0 && balancePuntos < puntosRequeridos) {
      toast.error("Tu balance de puntos es insuficiente");
      return;
    } else {
      if (userData?.userId && reward) {
        const data = await newRedemption({
          user_id: userData.userId,
          reward_id: reward[0].id,
          quantity,
        });
        handleApiResponse(data);
        if (data.response) {
          navigate(`/app/rewards/checkout/result/${data.response?.id}`);
        }
      }
    }
  };

  return (
    <div className="max-w-[70dvw] mx-auto relative top-6">
      <Link to="/app/rewards" className="h-[45px] text-[#515838] font-medium hover:underline">
        Vovler a Beneficios
      </Link>
      <div className="flex flex-col relative rounded-lg overflow-hidden mt-4 shadow-sm">
        {userData?.role ? (
          userData?.role >= RoleIds.ADMIN ? (
            <Link
              to={`/app/rewards/edit/${reward_id}`}
              className="absolute top-4 right-4 bg-[#FC6F2F] hover:bg-[#db4500] text-white flex rounded-md px-[24px] pt-[8px] pb-[8px] w-fit"
            >
              Editar
            </Link>
          ) : null
        ) : null}
        <img
          src="/mock-reward.png"
          className="object-cover object-center h-[300px] w-full"
          alt="imagen"
        />
        <div className="w-full flex justify-between items-center bg-white p-6">
          <h3 className="text-3xl font-epiBold pt-1">{reward?.[0].name}</h3>
          <div className="text-end">
            <p>Puntos requeridos</p>
            <h6 className="text-end text-3xl font-epiBold text-[#FC6F2F]">
              {reward ? NumberFormatter.format(reward?.[0].points_cost) : "-"}{" "}
              pts
            </h6>
          </div>
        </div>
        <div className="bg-white w-full px-6 pb-6 flex gap-10">
          <div className="w-1/2 flex flex-col gap-6">
            <div className="w-full ">
              <h5 className="text-lg font-bold">Descripcion</h5>
              <p className="">{reward ? reward?.[0].description : "-"}</p>
            </div>
            <div className="w-full ">
              <h5 className="text-lg font-bold">Stock</h5>
              <p className="">
                {reward ? reward?.[0].stock_balance : "-"} unidades
              </p>
            </div>
            <div className="w-full bg-[#FFE9D1] p-3 rounded-lg flex flex-col gap-2">
              <h5 className="text-lg font-epiBold">Detalles del canje</h5>
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
                  <p>Av. Centro comercial 2333</p>
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
                  <p>Sin vencimiento</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 ">
            <div className="w-full bg-[#f8f8f8] p-5 rounded-lg">
              <h5 className="text-lg font-epiBold pb-4">Canjear beneficio</h5>
              <div className="flex flex-col gap-4">
                <h6 className="font-medium">Seleccionar cantidad</h6>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSubstract}
                    className="text-xl pb-1 font-bold bg-[#e9e9e9] hover:bg-[#dbdbdb] text-[#515838] w-8 h-8 cursor-pointer outline-none rounded-full"
                  >
                    -
                  </button>
                  <p className="border-1 border-[#e0e0e0] px-7 h-8 pt-0.5 rounded-lg bg-white">
                    {quantity}
                  </p>
                  <button
                    onClick={handleAdd}
                    className="text-xl pb-1 font-bold bg-[#e9e9e9] hover:bg-[#dbdbdb] text-[#515838] w-8 h-8 cursor-pointer outline-none rounded-full"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between items-center pt-4 border-top border-t-1 border-[#e0e0e0]">
                  <h6 className="font-medium">Tu balance de puntos</h6>
                  <p className="font-medium">{NumberFormatter.format(balancePuntos)} pts</p>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="">Puntos requeridos</h6>
                  <p className="text-[#FC6F2F] font-medium">{NumberFormatter.format(puntosRequeridos)} pts</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-top border-t-1 border-[#e0e0e0]">
                  <h6 className="font-medium">Balance restante</h6>
                  <p className="font-medium">{NumberFormatter.format(balanceRestante)} pts</p>
                </div>
                <button
                  disabled={!reward || !userPointsResponse || isPending}
                  onClick={handleNewRedemption}
                  className="text-white text-lg bg-[#FC6F2F] hover:bg-[#db4500] px-2 py-2 w-full cursor-pointer outline-none rounded-lg mt-5"
                >
                  {isPending ? "Confirmando..." : "Confirmar canje"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default RewardCheckout;
