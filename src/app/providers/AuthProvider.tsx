import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { authService } from "../../shared/api/authService";
import axiosClient from "../../shared/api/axiosClient";
import { setItem } from "../../shared/utils/localStorage/saveToLocalStorage";
import { removeItem } from "../../shared/utils/localStorage/deleteFromLocalStorage";
import { getItem } from "../../shared/utils/localStorage/getFromLocalStorage";
import { AuthContextType } from "../../shared/types/AuthContextTypes";
import { JwtPayload } from "../../shared/types/jwtPayload";
import { decodeJWT } from "../../shared/utils/decodeJwt";
import useFetch from "../../shared/hooks/useFetch";

// Creamos el contexto
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const { serviceCall: loginService, handleApiResponse } = useFetch({
    service: authService.login,
    fetchOnRender: false,
  });

  const setAuthToken = (token: string | null) => {
    if (token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosClient.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    if (token) {
      setUserData(decodeJWT<JwtPayload>(token));
    } else {
      setUserData(null);
    }
  }, [token]);

  // Verifica si hay sesión activa al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getItem<string>("token");
        if (token !== null) {
          setToken(token ?? null);
          setAuthToken(token ?? null);
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

  const login = async (
    credentials: {
      email: string;
      password: string;
    },
    withResponseHandling = true,
  ): Promise<{ message: string; token: string } | null> => {
    const data = await loginService(credentials);
    if (withResponseHandling) {
      handleApiResponse(data);
    }
    const authToken = data?.response?.token ?? null;
    setAuthToken(authToken);
    setToken(authToken);
    if (authToken !== null) {
      setItem<string | null>("token", authToken);
    }
    return data.response;
  };

  const logout = () => {
    setLoading(true);
    try {
      setTimeout(() => {
        removeItem("token");
        setAuthToken(null);
        setToken(null);
        setLoading(false);
      }, 600);
    } catch (error) {
      console.error("No se pudo cerrar sesión", error);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, loading, login, logout, userData }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
