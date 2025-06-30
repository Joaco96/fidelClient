import { useEffect, useState } from "react";
import { ApiError, ApiResponse } from "../../entitites/apiResponse";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ServiceCallResponse<T> {
  response: T | null;
  error: ApiError | null;
}

function useFetch<T, K>({
  service,
  fetchOnRender = true,
}: {
  service?: (params: K) => Promise<ApiResponse<T>>;
  fetchOnRender?: boolean;
}) {
  const [response, setResponse] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    if (fetchOnRender) serviceCall({} as K);
  }, []);

  const serviceCall = async (params: K): Promise<ServiceCallResponse<T>> => {
    let serviceResponse: ServiceCallResponse<T> = {
      response: null,
      error: null,
    };
    if (!isPending && service) {
      setIsPending(true);
      setError(null);
      try {
        const { data } = await service(params);
        setResponse(data);
        serviceResponse = { response: data, error: null };
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.error;
          setError(errorMessage);
          serviceResponse = { response: null, error: errorMessage };
        } else {
          setError(error as ApiError);
          serviceResponse = { response: null, error: error as ApiError };
        }
      }
      setIsPending(false);
    }
    return serviceResponse;
  };

  function handleApiResponse<T>(
    data: ServiceCallResponse<T>,
    withSuccessHandling = true
  ) {
    if (data.response && typeof (data.response as any).message === "string") {
      if (withSuccessHandling) toast.success((data.response as any).message);
    } else {
      if (data.error?.message) toast.error(data.error?.message);
      else {
        const errores = Object.values(data.error ?? {}).flatMap((e) => e);
        if (errores.length)
          toast.error(errores.map((error) => <p>- {error}</p>));
      }
    }
  }

  return {
    response,
    isPending,
    error,
    serviceCall,
    handleApiResponse,
  };
}

export default useFetch;
