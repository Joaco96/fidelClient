import { useEffect, useState } from "react";
import { ApiResponse } from "../../entitites/apiResponse";

function useFetch<T>({ service }: { service: () => Promise<ApiResponse<T>> }) {
  const [response, setResponse] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!isPending) {
      setIsPending(true);
      setError(null);
      try {
        const { data } = await service();
        setResponse(data);
      } catch (error) {
        console.error(error);
        setError(error)
      }
      setIsPending(false);
    }
  };

  return {
    response, 
    isPending,
    error
  };
};

export default useFetch;
