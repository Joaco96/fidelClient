import { RouterProvider } from "react-router";
import { router } from "../routes/routes";

export default function RoutesProvider() {
  return (
    <RouterProvider router={router} />
  )
}
