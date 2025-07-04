import { ApiResponse } from "../../entitites/apiResponse";
import { User } from "../../entitites/User";
import axiosClient from "./axiosClient";

export const userService = {
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    const { data } = await axiosClient.get("/users");
    return data;
  },

  getUserById: async (id: string): Promise<ApiResponse<User[]>> => {
    const { data } = await axiosClient.get("/users", { params: { id: id } });
    return data;
  },

  getUserByDni: async (dni: string): Promise<ApiResponse<User[]>> => {
    const { data } = await axiosClient.get("/users", { params: { dni: dni } });
    return data;
  },
  
  getUserPoints: async (
    id: string
  ): Promise<ApiResponse<Pick<User, "points_balance">>> => {
    const { data } = await axiosClient.get(
      "/users/points/:id".replace(":id", id)
    );
    return data;
  },

  updateUser: async (
    id: string,
    updateData: Partial<User>
  ): Promise<ApiResponse<User>> => {
    const { data } = await axiosClient.patch(
      "/users/:id".replace(":id", id!),
      updateData
    );
    return data;
  },

  updateUserRole: async (
    id: string,
    body: Pick<User, "role_id">
  ): Promise<ApiResponse<User>> => {
    const { data } = await axiosClient.patch(
      "/users/assign-role/:id".replace(":id", id),
      body
    );
    return data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<[]>> => {
    const { data } = await axiosClient.delete("/users/:id".replace(":id", id));
    return data;
  },
};
