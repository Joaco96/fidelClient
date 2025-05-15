import { useEffect, useState } from "react";
import { ApiResponse } from "../../entitites/apiResponse";

function useFetch<T>({ service, fetchOnRender = true }: { service?: () => Promise<ApiResponse<T>>, fetchOnRender?: boolean }) {
  const [response, setResponse] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    if (fetchOnRender) getData();
  }, []);

  const getData = async () => {
    if (!isPending && service) {
      setIsPending(true);
      setError(null);
      try {
        const { data } = await service();
        setResponse(data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setIsPending(false);
    }
  };

  return {
    response,
    isPending,
    error,
    getData
  };
}

export default useFetch;
