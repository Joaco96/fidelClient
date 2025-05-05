import { createBrowserRouter } from "react-router";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import Layout from "../../pages/Layout";
import Register from "../../pages/Register";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <h1>Error pagina no encontrada</h1> },
    ],
  },
]);
