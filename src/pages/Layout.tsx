import { Outlet } from "react-router";
import { AuthProvider } from "../app/providers/AuthProvider";

const Layout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export default Layout;