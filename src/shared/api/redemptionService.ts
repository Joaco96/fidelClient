import { ApiResponse } from "../../entitites/apiResponse";
import { Redemption } from "../../entitites/Redemption";
import axiosClient from "./axiosClient";

export const redemptionService = {
    getRedemptionsByUserId: async (id: string): Promise<ApiResponse<Redemption[]>> => {
        const { data } =  await axiosClient.get('/redemptions', {params:{user_id: id}})
        return data;
    },

    getRedemptionsById: async (id: string): Promise<ApiResponse<Redemption[]>> => {
        const { data } =  await axiosClient.get('/redemptions', {params:{id: id}})
        return data;
    },

    newRedemption: async (body:{user_id: string, reward_id: string, quantity: number}): Promise<ApiResponse<{message: string, id: string}>> => {
        const { data } = await axiosClient.post('/redemptions', body);
        return data;
    }
}