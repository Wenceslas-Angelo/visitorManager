import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/AuthStore";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/connexion" />;
};

export default PrivateRoute;
