import { ApiResponse } from "../../entitites/apiResponse";
import { Ticket } from "../../entitites/Ticket";
import axiosClient from "./axiosClient";

export const ticketService = {
    getTicketsByUserId: async (id: string): Promise<ApiResponse<Ticket[]>> => {
        const { data } =  await axiosClient.get('/tickets', {params:{user_id: id}})
        return data;
    },

    getTickets: async (): Promise<ApiResponse<Ticket[]>>  => {
        const { data } =  await axiosClient.get('/tickets')
        return data;
    },
}