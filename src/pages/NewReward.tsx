import { useState } from "react";
import { Link } from "react-router";
import { NumberFormatter } from "../shared/utils/numberFormatter";
import { toast } from "sonner";
import useFetch from "../shared/hooks/useFetch";
import { rewardService } from "../shared/api/rewardService";

const NewReward = () => {
  const [rewardName, setRewardName] = useState<string | null>(null);
  const [rewardDescription, setRewardDescription] = useState<string | null>(
    null
  );
  const [pointsCost, setPointsCost] = useState<number>(0);
  const [initialBalance, setInitialBalance] = useState<number>(0);

  const {
    serviceCall: newReward,
    isPending: isPending,
    handleApiResponse,
  } = useFetch({
    service: rewardService.newReward,
    fetchOnRender: false,
  });

  const handleNewReward = async () => {
    if (pointsCost <= 0 && initialBalance <= 0) {
      toast.warning("Ingresar un valores mayores a 0");
      return;
    } else {
      if (rewardName && rewardDescription) {
        const data = await newReward({
          name: rewardName,
          description: rewardDescription,
          points_cost: pointsCost,
          stock_balance: initialBalance,
        });
        handleApiResponse(data);
        if (data.response) {
          setRewardName("");
          setRewardDescription("");
          setPointsCost(0);
          setInitialBalance(0);
        }
      } else {
        toast.warning("Hay campos incompletos");
      }
    }
  };

  return (
    <div className="max-w-[70dvw] m-auto rounded-lg pb-8 top-5 relative pt-3 gap-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-epiBold pt-2">Nuevo beneficio</h3>
            <p className="">Creá un nuevo beneficio para el programa de fidelización.</p>
          </div>
        </div>

        <Link to="/app/rewards" className="text-[#FC6F2F] hover:underline font-medium">
          Vovler a beneficios
        </Link>
      </div>
      <div className="max-w-[70vw] flex w-full m-auto gap-8 pb-8 h-full relative">
        <div className="w-1/2">
        <h4 className="text-xl pb-2 font-epiBold">Beneficio</h4>
          <div className="h-fit bg-white shadow-sm rounded-lg p-5">
            <label className="block mb-2 text-sm font-medium">
              Nombre del beneficio
            </label>
            <input
              maxLength={255}
              type="text"
              className="block w-full px-4 py-2 border rounded-md border-[#72727260]"
              onChange={(e) => setRewardName(e.target.value)}
              value={rewardName ?? ""}
              placeholder="Ingresa el nombre del beneficio"
            />
            <label className="block my-2 text-sm font-medium pt-4">
              Descripcion
            </label>
            <textarea
              maxLength={255}
              className="block w-full px-4 py-2 border rounded-md h-40 resize-none border-[#72727260]"
              onChange={(e) => setRewardDescription(e.target.value)}
              value={rewardDescription ?? ""}
              placeholder="Descripcion"
            />
            <div className="flex w-full justify-between gap-4 pt-4">
              <div className="w-1/2">
                <label className="block my-2 text-sm font-medium">
                  Puntos requeridos
                </label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 border rounded-md no-arrows border-[#72727260]"
                  onChange={(e) => setPointsCost(Number(e.target.value))}
                  value={pointsCost}
                  placeholder="$"
                />
              </div>
              <div className="w-1/2">
                <label className="block my-2 text-sm font-medium">
                  Stock inicial
                </label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 border rounded-md no-arrows border-[#72727260]"
                  onChange={(e) => setInitialBalance(Number(e.target.value))}
                  value={initialBalance}
                  placeholder="$"
                />
              </div>
            </div>
          </div>
            <button
              disabled={isPending}
              onClick={handleNewReward}
              className="text-white text-lg bg-[#FC6F2F] hover:bg-[#db4500] px-2 py-2 w-full cursor-pointer outline-none rounded-lg mt-6"
            >
              {isPending ? "Creando..." : "Crear beneficio"}
            </button>
          <p className="pt-4">
            Este beneficio aparecerá en el catalogo una vez creado.
          </p>
        </div>
        <div className="w-1/2 h-full">
          <h4 className="text-xl pb-2 font-epiBold">Vista previa</h4>
          <div className="border-1 overflow-hidden w-full rounded-lg bg-white shadow-sm border-white hover:border-amber-500 group hover:cursor-pointer">
            <div className="h-[200px] w-full overflow-hidden z-2">
              <img
                src="/mock-reward.png"
                alt={rewardName ?? ""}
                className="w-full h-full object-cover object-center group-hover:scale-[103%] transition-all duration-400"
              />
            </div>
            <div className="p-5 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg group-hover:text-[#FC6F2F] ">
                  {rewardName}
                </h2>
                <h4 className="text-[#FC6F2F] text-xl font-bold">
                  {NumberFormatter.format(pointsCost)} pts
                </h4>
              </div>
              <div>
                <p className="tres-lineas text-gray-700 pb-2">
                  {rewardDescription}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h6 className="font-medium text-gray-500">Shopping</h6>
                <h5 className="font-medium text-gray-500">
                  En stock: {initialBalance}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReward;
