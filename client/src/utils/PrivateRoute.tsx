import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/connexion" />;
};

export default PrivateRoute;
