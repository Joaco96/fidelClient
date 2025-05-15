import { ApiResponse } from "../../entitites/apiResponse";
import { Redemption } from "../../entitites/Redemption";
import axiosClient from "./axiosClient";

export const redemptionService = {
    getRedemptionsByUserId: async (id: string): Promise<ApiResponse<Redemption[]>> => {
        const { data } =  await axiosClient.get('/redemptions', {params:{user_id: id}})
        return data;
    },
}