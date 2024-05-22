import React from "react";
import { useAppSelector } from "../app/hooks";
import BtnAddVisitor from "../components/BtnAddVisitor";
import Filtre from "../components/Filtre";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
import Pagination from "../components/Pagination";
import { useDeleteModalStore, useFormModalStore } from "../features/store";
import Container from "../utils/Container";

const Visiteurs = () => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();

  const allVisitor = useAppSelector((state) => state.visitor.allVisitors);

  return (
    <Container>
      <div className="w-full">
        <div className="flex items-center justify-between my-10">
          <Filtre showDateFilter={true} />
          <div className="w-40 ">
            <BtnAddVisitor />
          </div>
        </div>
        <Pagination
          pageCount={allVisitor.totalPages}
          data={allVisitor.visitors}
        />
      </div>

      {formModalIsOpen ? <FormVisitor /> : null}
      {deleteModalIsOpen ? <ModaleDelete /> : null}
    </Container>
  );
};

export default Visiteurs;
