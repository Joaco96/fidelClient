import { createBrowserRouter } from "react-router";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import Register from "../../pages/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import Landing from "../../pages/Landing";
import Admin from "../../pages/Admin";
import Control from "../../pages/Control";
import Rewards from "../../pages/Rewards";
import Users from "../../pages/Users";
import Profile from "../../pages/Profile";
import ErrorPage from "../../pages/ErrorPage";
import { RoleIds } from "../../entitites/Role";
import NewStore from "../../pages/NewStore";
import NewReward from "../../pages/NewReward";
import EditReward from "../../pages/EditReward";
import RewardCheckout from "../../pages/RewardCheckout";
import RedemptionSuccess from "../../pages/RedemptionSuccess";
import Redemption from "../../pages/Redemption";
import UserDetail from "../../pages/UserDetail";
import Layout from "../../shared/components/layout/Layout";
import NewTicket from "../../pages/NewTicket";
import ProfileDetail from "../../pages/ProfileDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute minimumNeededRole={RoleIds.ADMIN}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "ticket",
        element: (
          <ProtectedRoute minimumNeededRole={RoleIds.EMPLOYEE}>
            <NewTicket />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: ":user_id",
            element: (
              <ProtectedRoute>
                <ProfileDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute minimumNeededRole={RoleIds.ADMIN}>
                <Users />
              </ProtectedRoute>
            ),
          },
          {
            path: ":user_id",
            element: (
              <ProtectedRoute minimumNeededRole={RoleIds.ADMIN}>
                <UserDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "rewards",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Rewards />
              </ProtectedRoute>
            ),
          },
          {
            path: "new",
            element: (
              <ProtectedRoute minimumNeededRole={RoleIds.ADMIN}>
                <NewReward />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:reward_id",
            element: (
              <ProtectedRoute minimumNeededRole={RoleIds.ADMIN}>
                <EditReward />
              </ProtectedRoute>
            ),
          },
          {
            path: "checkout/:reward_id",
            element: (
              <ProtectedRoute>
                <RewardCheckout />
              </ProtectedRoute>
            ),
          },
          {
            path: "checkout/result/:redemption_id",
            element: (
              <ProtectedRoute>
                <RedemptionSuccess />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "redemptions",
        children: [
          {
            index: true,
            element: <ErrorPage />,
          },
          {
            path: ":redemption_id",
            element: (
              <ProtectedRoute>
                <Redemption />
              </ProtectedRoute>
            ),
          },
          {
            path: "control",
            element: (
              <ProtectedRoute minimumNeededRole={RoleIds.EMPLOYEE}>
                <Control />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "stores",
        children: [
          {
            index: true,
            element: <ErrorPage />,
          },
          {
            path: "new",
            element: (
              <ProtectedRoute minimumNeededRole={RoleIds.ADMIN}>
                <NewStore />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:store_id",
            element: (
              <ProtectedRoute minimumNeededRole={RoleIds.ADMIN}>
                <NewStore />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
