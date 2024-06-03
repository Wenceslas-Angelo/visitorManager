import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
import Pagination from "../components/Pagination";
import VisitorTable from "../components/VisitorTable";
import { logout } from "../features/auth/authSlice";
import {
  useDeleteModalStore,
  useFormModalStore,
  usePageStore,
  useSearchStore,
} from "../features/store";
import { readAllVisitors } from "../features/visitor/visitorSlice";
import { useReadAllVisitors } from "../hooks/useVisitorQuery";
import Container from "../utils/Container";

const Visiteurs = () => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  const { searchQuery, purposeQuery, dateQuery } = useSearchStore();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { page } = usePageStore();
  const allVisitorQuery = useReadAllVisitors(
    user ? user.token : "",
    page,
    searchQuery,
    purposeQuery,
    dateQuery
  );
  const allVisitor = useAppSelector((state) => state.visitor.allVisitors);

  if (allVisitorQuery.error?.message === "Unauthorized") {
    dispatch(logout());
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!allVisitorQuery.data) return;
    dispatch(readAllVisitors(allVisitorQuery.data));
  }, [dispatch, allVisitorQuery.data, isAuthenticated]);

  return (
    <Container>
      <div className="w-full my-5">
        {allVisitor.totalPages ? (
          <Pagination
            pageCount={allVisitor.totalPages}
            data={allVisitor.visitors}
          />
        ) : (
          <VisitorTable visitorsData={allVisitor.visitors} />
        )}
      </div>

      {formModalIsOpen ? <FormVisitor /> : null}
      {deleteModalIsOpen ? <ModaleDelete /> : null}
    </Container>
  );
};

export default Visiteurs;
