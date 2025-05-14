import { ApiResponse } from "../../entitites/apiResponse";
import { Reward } from "../../entitites/Reward";
import { User } from "../../entitites/User";
import axiosClient from "./axiosClient";

export const userService = {
    getRewards: async (): Promise<ApiResponse<Reward[]>> => {
        const { data } =  await axiosClient.get('/rewards')
        return data;
    },

    updateUser: async (id: string, updateData: Partial<User>): Promise<ApiResponse<User>> => {
        const { data } =  await axiosClient.patch(('/users/:id').replace(":id", id), updateData)
        return data;
    },

    updateUserRole: async (id: string, body: Pick<User, "role_id">): Promise<ApiResponse<User>> => {
        const { data } =  await axiosClient.patch(('/users/assign-role/:id').replace(":id", id), body)
        return data;
    },
}