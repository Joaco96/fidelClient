import { ApiResponse } from "../../entitites/apiResponse";
import { Reward } from "../../entitites/Reward";
import axiosClient from "./axiosClient";

export const rewardService = {
  getRewards: async (): Promise<ApiResponse<Reward[]>> => {
    const { data } = await axiosClient.get("/rewards");
    return data;
  },

  getRewardById: async (id: string): Promise<ApiResponse<Reward[]>> => {
    const { data } = await axiosClient.get("/rewards", { params: { id: id } });
    return data;
  },

  newReward: async (credentials: {
    name: string;
    description: string;
    points_cost: number;
    stock_balance: number;
  }): Promise<ApiResponse<{ message: string; id: string }>> => {
    const { data } = await axiosClient.post("/rewards", credentials);
    return data;
  },
};
