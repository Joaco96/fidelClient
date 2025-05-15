import { ApiResponse } from "../../entitites/apiResponse";
import { Reward } from "../../entitites/Reward";
import axiosClient from "./axiosClient";

export const rewardService = {
    getRewards: async (): Promise<ApiResponse<Reward[]>> => {
        const { data } =  await axiosClient.get('/rewards')
        return data;
    },
}