/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { usePageStore, useSearchStore } from "../features/store";
import {
  readAllVisitors,
  readAllVisitorsToday,
} from "../features/visitor/visitorSlice";
import { useReadAllTodayVisitors, useReadAllVisitors } from "./useVisitorQuery";

export const useVisitors = (type: "all" | "today" = "all") => {
  const dispatch = useAppDispatch();
  const { searchQuery, purposeQuery, dateQuery } = useSearchStore();
  const { page } = usePageStore();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const allVisitors = useAppSelector((state) => state.visitor.allVisitors);
  const allVisitorToday = useAppSelector(
    (state) => state.visitor.allVisitorsToday
  );

  const allVisitorQuery =
    type === "all"
      ? useReadAllVisitors(
          user?.token || "",
          page,
          searchQuery,
          purposeQuery,
          dateQuery
        )
      : useReadAllTodayVisitors(user?.token || "", searchQuery, purposeQuery);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (allVisitorQuery.error?.message === "Unauthorized") {
      dispatch(logout());
      return;
    }
    if (allVisitorQuery.data) {
      type === "all"
        ? dispatch(readAllVisitors(allVisitorQuery.data))
        : dispatch(readAllVisitorsToday(allVisitorQuery.data));
    }
  }, [
    dispatch,
    allVisitorQuery.data,
    allVisitorQuery.error?.message,
    isAuthenticated,
    type,
  ]);

  return { allVisitors, allVisitorToday, isAuthenticated };
};
