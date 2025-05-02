import { ApiResponse } from "../../entitites/apiResponse";
import axiosClient from "./axiosClient";

export const authService = {
    login: async (credentials: {email:string, password:string}): Promise<ApiResponse<{message: string, token: string}>> => {
        const { data } =  await axiosClient.post('/users/login', credentials);
        return data;
    }
}