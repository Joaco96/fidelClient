import { JwtPayload } from "./jwtPayload";

export interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }, withResponseHandling?: boolean) => Promise<{ message: string; token: string } | null>;
  logout: () => void;
  userData: JwtPayload | null;
}
