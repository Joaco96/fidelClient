import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { rewardService } from "../shared/api/rewardService";
import useFetch from "../shared/hooks/useFetch";
import { toast } from "sonner";
import { NumberFormatter } from "../shared/utils/numberFormatter";

const EditReward = () => {
  const { reward_id } = useParams();
  const { response: reward } = useFetch({
    service: reward_id
      ? () => rewardService.getRewardById(reward_id)
      : undefined,
  });

  const [rewardName, setRewardName] = useState<string | null>(
    reward && reward.length ? reward[0].name : null
  );

  const [rewardDescription, setRewardDescription] = useState<string | null>(
    reward && reward.length ? reward[0].description : null
  );
  const [pointsCost, setPointsCost] = useState<number>(
    reward && reward.length ? reward[0].points_cost : 0
  );
  const [initialBalance, setInitialBalance] = useState<number>(
    reward && reward.length ? reward[0].stock_balance : 0
  );

  const {
    serviceCall: editReward,
    isPending: isPending,
    handleApiResponse,
  } = useFetch({
    service: rewardService.editReward,
    fetchOnRender: false,
  });

  const handleEditReward = async () => {
    if (pointsCost <= 0) {
      toast.warning("Ingresar un valores mayores a 0");
      return;
    } else {
      if (rewardName && rewardDescription && reward_id) {
        const data = await editReward({
          id: reward_id,
          name: rewardName,
          description: rewardDescription,
          points_cost: pointsCost,
        });
        handleApiResponse(data);
        if (data.response) {
          toast.success("Modificaciones guardadas con éxito")
          setRewardName(data.response.name);
          setRewardDescription(data.response.description);
          setPointsCost(data.response.points_cost);
        }
      } else {
        toast.warning("Hay campos incompletos");
      }
    }
  };

  useEffect(() => {
    if (reward && reward.length > 0) {
      setRewardName(reward[0].name);
      setRewardDescription(reward[0].description);
      setPointsCost(reward[0].points_cost);
      setInitialBalance(reward[0].stock_balance)
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
              className="block w-full px-4 py-2 border rounded-md"
              onChange={(e) => setRewardName(e.target.value)}
              value={rewardName ?? ""}
              placeholder="Ingresa el nombre del beneficio"
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
                  className="block w-full px-4 py-2 border rounded-md no-arrows"
                  onChange={(e) => setPointsCost(Number(e.target.value))}
                  value={pointsCost}
                  placeholder="$"
                />
              </div>
              <div className="w-1/2">
                <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                  Stock actual
                </label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 border rounded-md no-arrows"
                  value={initialBalance}
                  placeholder="$"
                  disabled
                />
              </div>
            </div>
          </div>
          <button
            disabled={isPending}
            onClick={handleEditReward}
            className="text-white text-lg bg-amber-600 hover:bg-gray-800 px-2 py-2 w-full cursor-pointer outline-none rounded-lg mt-6"
          >
            {isPending ? "Guardando..." : "Guardar cambios"}
          </button>
          <p className="pt-4">
            Estas modificaciones apareceran en el catalogo una vez guardados.
          </p>
        </div>
        <div className="w-1/2 h-full px-3">
          <h4 className="text-xl pb-4 font-epiBold">Vista previa</h4>
          <div className="border-1 overflow-hidden w-full rounded-lg bg-[#1a1a1a] border-white hover:border-amber-500 group hover:cursor-pointer">
            <div className="h-[200px] w-full overflow-hidden z-2">
              <img
                src="/mock-reward.png"
                alt={rewardName ?? ""}
                className="w-full object-cover object-center group-hover:scale-[104%] transition-all duration-400"
              />
            </div>
            <div className="p-5">
              <span>9841984198848449849</span>
              <h2 className="font-bold text-xl pb-2 group-hover:text-amber-500">
                {rewardName}
              </h2>
              <p className="tres-lineas">{rewardDescription}</p>
              <h4>Costo: {NumberFormatter.format(pointsCost)} puntos</h4>
              <h5>Stock: {initialBalance} beneficios</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReward;
