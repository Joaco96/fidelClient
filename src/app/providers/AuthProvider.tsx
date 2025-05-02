import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { authService } from "../../shared/api/authService";
import { AxiosError } from "axios";
import { ApiResponse } from "../../entitites/apiResponse";
import axiosClient from "../../shared/api/axiosClient";
import { useNavigate } from "react-router";
import { setItem } from "../../shared/utils/localStorage/saveToLocalStorage";
import { removeItem } from "../../shared/utils/localStorage/deleteFromLocalStorage";
import { getItem } from "../../shared/utils/localStorage/getFromLocalStorage";
import { AuthContextType } from "../../shared/types/AuthContextTypes";

// Creamos el contexto
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const setAuthToken = (token: string | null) => {
    if (token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosClient.defaults.headers.common["Authorization"];
    }
  };

  // Verifica si hay sesión activa al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getItem<string>("token");
        console.log(token)
        if (token !== null) {
          setToken(token ?? null);
          setAuthToken(token ?? null);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const { data } = await authService.login(credentials);
      setAuthToken(data?.token ?? null);
      setToken(data?.token ?? null);
      if (data?.token !== null) {
        setItem<string | null>("token", data?.token ?? null);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      throw (
        ((error as AxiosError).response?.data as ApiResponse).message ||
        "No se pudo iniciar sesión"
      );
    }
  };

  const logout = async () => {
    try {
      removeItem("token");
      setAuthToken(null);
      setToken(null);
      navigate("/login");
    } catch (error) {
      console.error("No se pudo cerrar sesión", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
