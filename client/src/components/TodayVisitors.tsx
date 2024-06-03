import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import {
  useDeleteModalStore,
  useFormModalStore,
  useSearchStore,
} from "../features/store";
import { readAllVisitorsToday } from "../features/visitor/visitorSlice";
import { useReadAllTodayVisitors } from "../hooks/useVisitorQuery";
import Container from "../utils/Container";
import FormVisitor from "./FormVisitor";
import ModaleDelete from "./ModaleDelete";
import VisitorTable from "./VisitorTable";

type Props = {
  variant: "all" | "in" | "out";
};

const TodayVisitors = ({ variant }: Props) => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const allVisitorToday = useAppSelector(
    (state) => state.visitor.allVisitorsToday
  );
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { searchQuery, purposeQuery } = useSearchStore();
  const allVisitorQuery = useReadAllTodayVisitors(
    user ? user.token : "",
    searchQuery,
    purposeQuery
  );

  if (allVisitorQuery.error?.message === "Unauthorized") {
    dispatch(logout());
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!allVisitorQuery.data) return;
    dispatch(readAllVisitorsToday(allVisitorQuery.data));
  }, [dispatch, allVisitorQuery.data, isAuthenticated]);

  return (
    <Container>
      <div className="w-full">
        <div className="w-full mt-10">
          <VisitorTable
            visitorsData={
              variant === "all"
                ? allVisitorToday.visitors
                : variant === "in"
                ? allVisitorToday.visitors.filter(
                    (visitor) => !visitor.endDateTime
                  )
                : allVisitorToday.visitors.filter(
                    (visitor) => visitor.endDateTime
                  )
            }
            visitorActive={variant === "in" ? true : false}
          />
        </div>
        {formModalIsOpen ? <FormVisitor /> : null}
        {deleteModalIsOpen ? <ModaleDelete /> : null}
      </div>
    </Container>
  );
};

export default TodayVisitors;
