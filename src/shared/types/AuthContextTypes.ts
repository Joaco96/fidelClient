import { ApiResponse } from "../../entitites/apiResponse";
import { JwtPayload } from "./jwtPayload";

export interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<ApiResponse>;
  logout: () => void;
  userData: JwtPayload | null;
}
