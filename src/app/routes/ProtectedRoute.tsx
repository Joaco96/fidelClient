import { useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <>{token ? children : null}</>;
};
