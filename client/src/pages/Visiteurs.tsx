import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import VisitorTable from "../components/VisitorTable";
import { readAllVisitors } from "../features/visitor/visitorSlice";
import { useReadAllVisitors } from "../hooks/useVisitorQuery";
import Container from "../utils/Container";

const Visiteurs = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const allVisitorQuery = useReadAllVisitors(user ? user.token : "", 1);
  const allVisitor = useAppSelector((state) => state.visitor.allVisitors);

  useEffect(() => {
    if (!allVisitorQuery.data) return;
    dispatch(readAllVisitors(allVisitorQuery.data));
  }, [dispatch, allVisitorQuery.data]);

  return (
    <Container>
      <div className="w-full mt-10">
        <VisitorTable visitorsData={allVisitor.results} />
      </div>
    </Container>
  );
};

export default Visiteurs;
