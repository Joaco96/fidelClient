import { createBrowserRouter } from "react-router";
import Login from "../../pages/Login";
import { AuthProvider } from "../providers/AuthProvider";
import Layout from "../../pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <AuthProvider>
            <Login />
          </AuthProvider>
        ),
      },
      { path: "*", element: <h1>Error pagina no encontrada</h1> },
    ],
  },
]);
