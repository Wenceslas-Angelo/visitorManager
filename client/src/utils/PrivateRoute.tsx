import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { usePageStore, useSearchStore } from "../features/store";
import { readAllVisitors } from "../features/visitor/visitorSlice";
import { useReadAllVisitors } from "../hooks/useVisitorQuery";

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { page } = usePageStore();
  const { searchQuery, purposeQuery, dateQuery } = useSearchStore();
  const allVisitorQuery = useReadAllVisitors(
    user ? user.token : "",
    page,
    searchQuery,
    purposeQuery,
    dateQuery
  );

  if (allVisitorQuery.error?.message === "Unauthorized") {
    dispatch(logout());
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!allVisitorQuery.data) return;
    dispatch(readAllVisitors(allVisitorQuery.data));
  }, [dispatch, allVisitorQuery.data, isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/connexion" />;
};

export default PrivateRoute;
