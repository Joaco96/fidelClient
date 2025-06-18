import { ApiResponse } from "../../entitites/apiResponse";
import axiosClient from "./axiosClient";

export const stockService = {
  addStock: async (body: {
    reward_id: string;
    quantity: number;
  }): Promise<ApiResponse<{ message: string; id: string }>> => {
    const { data } = await axiosClient.post("/stock", body);
    return data;
  },
};
