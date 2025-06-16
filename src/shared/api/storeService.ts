import { ApiResponse } from "../../entitites/apiResponse";
import { Store } from "../../entitites/Store";
import axiosClient from "./axiosClient";

export const storeService = {
  getStores: async (): Promise<ApiResponse<Store[]>> => {
    const { data } = await axiosClient.get("/stores");
    return data;
  },
};
