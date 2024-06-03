import React from "react";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
import Pagination from "../components/Pagination";
import VisitorTable from "../components/VisitorTable";
import { useDeleteModalStore, useFormModalStore } from "../features/store";
import { useVisitors } from "../hooks/useVisitors";
import Container from "../utils/Container";

const Visiteurs = () => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  const { allVisitors } = useVisitors("all");

  return (
    <Container>
      <div className="w-full my-5">
        {allVisitors.totalPages ? (
          <Pagination
            pageCount={allVisitors.totalPages}
            data={allVisitors.visitors}
          />
        ) : (
          <VisitorTable visitorsData={allVisitors.visitors} />
        )}
      </div>
      {formModalIsOpen && <FormVisitor />}
      {deleteModalIsOpen && <ModaleDelete />}
    </Container>
  );
};

export default Visiteurs;
