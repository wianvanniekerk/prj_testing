import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return isAuthenticated ? children : <Navigate to="/" />;
  }
  return <Outlet/>
};

export default ProtectedRoute;
