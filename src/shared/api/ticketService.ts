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

    getPointsRate: async (): Promise<ApiResponse<{rate: number}>>  => {
        const { data } =  await axiosClient.get('/tickets/points-rate')
        return data;
    },

    newTicket: async (body:{id: string, user_id: string, store_id: string, amount_spent: number}): Promise<ApiResponse<{message: string, points_earned: number}>> => {
        const { data } = await axiosClient.post('/tickets', body);
        return data;
    }
}