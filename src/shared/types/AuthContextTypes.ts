import { ApiResponse } from "../../entitites/apiResponse";

export interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<ApiResponse>;
  logout: () => void;
}
