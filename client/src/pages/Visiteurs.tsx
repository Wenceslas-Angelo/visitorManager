import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import FormVisitor from "../components/FormVisitor";
import Pagination from "../components/Pagination";
import VisitorTable from "../components/VisitorTable";
import { useFormModalStore } from "../features/store";
import { readAllVisitors } from "../features/visitor/visitorSlice";
import { useReadAllVisitors2 } from "../hooks/useVisitorQuery";
import Container from "../utils/Container";

const Visiteurs = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { formModalIsOpen } = useFormModalStore();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const allVisitorQuery2 = useReadAllVisitors2(user ? user.token : "");
  const allVisitor = useAppSelector((state) => state.visitor.allVisitors);

  useEffect(() => {
    if (!allVisitorQuery2.data) return;
    dispatch(readAllVisitors(allVisitorQuery2.data.pages[currentPage]));
  }, [dispatch, allVisitorQuery2.data, currentPage]);

  return (
    <Container>
      <div className="w-full mt-10">
        <VisitorTable visitorsData={allVisitor.results} />
      </div>
      <div className="w-full">
        <Pagination
          visitors={allVisitorQuery2}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      {formModalIsOpen ? <FormVisitor /> : null}
    </Container>
  );
};

export default Visiteurs;
