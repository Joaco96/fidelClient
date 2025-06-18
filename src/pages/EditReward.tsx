import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { rewardService } from "../shared/api/rewardService";
import useFetch from "../shared/hooks/useFetch";
import { toast } from "sonner";
import { NumberFormatter } from "../shared/utils/numberFormatter";
import { stockService } from "../shared/api/stockService";

const EditReward = () => {
  const { reward_id } = useParams();
  const { response: reward, serviceCall: getReward } = useFetch({
    service: reward_id
      ? () => rewardService.getRewardById(reward_id)
      : undefined,
  });

  const [rewardDescription, setRewardDescription] = useState<string | null>(
    reward && reward.length ? reward[0].description : null
  );
  const [stockBalance, setStockBalance] = useState<number>(
    reward && reward.length ? reward[0].stock_balance : 0
  );
  const [stockQuantity, setStockQuantity] = useState<number>(0);

  const {
    serviceCall: addStock,
    isPending: stockPending,
    handleApiResponse: handleStockApiResponse,
  } = useFetch({
    service: stockService.addStock,
    fetchOnRender: false,
  });

  const {
    serviceCall: editReward,
    isPending: isPending,
    handleApiResponse,
  } = useFetch({
    service: rewardService.editReward,
    fetchOnRender: false,
  });

  const handleAddStock = async () => {
    if (reward_id && stockQuantity != 0) {
      const data = await addStock({
        reward_id: reward_id,
        quantity: stockQuantity,
      });
      handleStockApiResponse(data);
      if (data.response) {
        getReward(reward_id);
      }
    } else {
      toast.warning("Hay campos incompletos");
    }
  };

  const handleEditReward = async () => {
    
      if (rewardDescription && reward_id) {
        const data = await editReward({
          id: reward_id,
          description: rewardDescription,
        });
        handleApiResponse(data);
        if (data.response) {
          toast.success("Modificaciones guardadas con éxito");
          setRewardDescription(data.response.description);
          setStockBalance(data.response.stock_balance);
        }
      } else {
        toast.warning("Hay campos incompletos");      
    }
  };

  useEffect(() => {
    if (reward && reward.length > 0) {
      setRewardDescription(reward[0].description);
      setStockBalance(reward[0].stock_balance);
    }
  }, [reward]);

  return (
    <div className="max-w-[70dvw] m-auto rounded-lg pb-8 top-5 relative pt-3 gap-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-epiBold pt-2">Editar beneficio</h3>
            <p>Editá un beneficio para el programa de fidelización.</p>
          </div>
        </div>

        <Link to="/app/rewards" className="text-white">
          Vovler a beneficios
        </Link>
      </div>
      <div className="max-w-[70vw] flex w-full m-auto gap-8 pb-8 h-full relative">
        <div className="w-1/2">
          <div className="h-fit border-1 border-white rounded-lg p-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre del beneficio
            </label>
            <input
              maxLength={255}
              type="text"
              className="block w-full px-4 py-2 border rounded-md border-[#77777760]"
              value={reward?.[0].name}
              disabled
            />
            <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
              Descripcion
            </label>
            <textarea
              maxLength={255}
              className="block w-full px-4 py-2 border rounded-md h-40 resize-none"
              onChange={(e) => setRewardDescription(e.target.value)}
              value={rewardDescription ?? ""}
              placeholder="Descripcion"
            />
            <div className="flex w-full justify-between gap-4">
              <div className="w-1/2">
                <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                  Puntos requeridos
                </label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 border rounded-md no-arrows border-[#77777760]"
                  value={reward?.[0].points_cost}
                  placeholder="$"
                  disabled
                />
              </div>
              <div className="w-1/2">
                <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                  Stock actual
                </label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 border rounded-md no-arrows border-[#77777760]"
                  value={stockBalance}
                  placeholder="$"
                  disabled
                />
              </div>
            </div>
            <button
              disabled={isPending}
              onClick={handleEditReward}
              className="text-white text-lg bg-amber-600 hover:bg-gray-800 px-2 py-2 w-full cursor-pointer outline-none rounded-lg mt-6"
            >
              {isPending ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
          <p className="py-4">
            Estas modificaciones apareceran en el catalogo una vez guardados.
          </p>
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Agregar o descontar stock
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                className="block w-2/3 px-4 py-2 border rounded-md no-arrows"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                placeholder="Valor a agregar"
              />
              <button
                disabled={stockPending}
                onClick={handleAddStock}
                className="text-white text-lg bg-amber-600 hover:bg-gray-800 px-2 py-2 cursor-pointer outline-none rounded-lg w-1/3"
              >
                {stockPending ? "Agregando..." : "Agregar"}
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full px-3">
          <h4 className="text-xl pb-4 font-epiBold">Vista previa</h4>
          <div className="border-1 overflow-hidden w-full rounded-lg bg-[#1a1a1a] border-white hover:border-amber-500 group hover:cursor-pointer">
            <div className="h-[200px] w-full overflow-hidden z-2">
              <img
                src="/mock-reward.png"
                alt={reward?.[0].name}
                className="w-full h-full object-cover object-center group-hover:scale-[104%] transition-all duration-400"
              />
            </div>
            <div className="p-5">
              <span>9841984198848449849</span>
              <h2 className="font-bold text-xl pb-2 group-hover:text-amber-500">
                {reward?.[0].name}
              </h2>
              <p className="tres-lineas">{rewardDescription}</p>
              <h4>Costo: {NumberFormatter.format(reward?.[0].points_cost)} puntos</h4>
              <h5>Stock: {stockBalance} beneficios</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReward;
