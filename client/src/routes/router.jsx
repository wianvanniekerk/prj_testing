import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import ProtectedRoute from "./protectedRoute";
import Login from "../presenter/pages/login";
import Info from "../presenter/pages/info";
import Settings from "../presenter/pages/settings";
import Stats from "../presenter/pages/stats";
import Specs from "../presenter/pages/specs";
import Register from "../presenter/pages/register";

const getAccessToken = () => {
  return Cookies.get("accessToken");
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    index: true,
  },
  {
    path: "/register",
    element: <Register />,
    index: true,
  },
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
    children: [
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "/stats/*",
        element: <Stats />,
      },
      {
        path: "/specs",
        element: <Specs />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default Router;
