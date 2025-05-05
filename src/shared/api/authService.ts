import { ApiResponse } from "../../entitites/apiResponse";
import axiosClient from "./axiosClient";

export const authService = {
    login: async (credentials: {email:string, password:string}): Promise<ApiResponse<{message: string, token: string}>> => {
        const { data } =  await axiosClient.post('/users/login', credentials);
        return data;
    },
    register: async (credentials: {name: string, email:string, password:string}): Promise<ApiResponse<{message: string, id: string}>> => {
        const { data } =  await axiosClient.post('/users', credentials);
        return data;
    }
}