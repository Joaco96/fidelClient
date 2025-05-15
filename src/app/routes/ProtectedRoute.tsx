import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { useEffect, useState } from "react";
import { RoleIds } from "../../entitites/Role";
import { decodeJWT } from "../../shared/utils/decodeJwt";
import { JwtPayload } from "../../shared/types/jwtPayload";
import ErrorPage from "../../pages/ErrorPage";

export const ProtectedRoute = ({ children, minimumNeededRole }: { children: React.ReactNode, minimumNeededRole?: RoleIds }) => {
  const location = useLocation();
  const [canView, setCanView] = useState(true);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && minimumNeededRole) {
      const payload = decodeJWT<JwtPayload>(token)
      setCanView(payload?.role ? payload?.role >= minimumNeededRole : false)
    }
    if (location.pathname === "/login" && token) {
      navigate("/app/dashboard")
    }
    if (!token) {
      navigate("/login");
    }
    setLoading(false)
  }, [token, navigate]);

  return <>{loading ? null : (canView ? children : <ErrorPage />)}</>;
};
