import { AxiosError } from "axios";
import { ApiResponse } from "../entitites/apiResponse";
import axiosClient from "../shared/api/axiosClient";
import { Key, useState } from "react";
import { useAuth } from "../app/providers/AuthProvider";

const Dashboard = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { logout } = useAuth();

  const getRewards = async () => {
    if (!isPending) {
      setIsPending(true);
      try {
        const { data } = await axiosClient.get("/rewards");
        setResponse(data);
      } catch (error) {
        console.error(error);
        throw (
          ((error as AxiosError).response?.data as ApiResponse).message ||
          "No se pudo obtener beneficios"
        );
      }
      setIsPending(false);
    }
  };

  return (
    <>
      <h1 className="mb-4">Beneficios disponibles</h1>
      {response?.data.map(
        (item: {
          id: string;
          name: string;
          points_cost: number;
          stock_balance: number;
          description: string;
        }) => (
          <div className="w-[400px] p-4 border-1 border-white" key={item.id}>
            <h2 className="font-bold text-xl pb-2">{item.name}</h2>
            <p>{item.description}</p>
            <h4>Costo: {item.points_cost} puntos</h4>
            <h5>Stock: {item.stock_balance} beneficios</h5>
          </div>
        )
      )}
      <button
        onClick={getRewards}
        disabled={isPending}
        className="mb-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending ? "Getting Rewards..." : "Get Rewards"}
      </button>
      <button
        onClick={logout}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
