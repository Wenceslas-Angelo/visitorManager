import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import BtnAddVisitor from "../components/BtnAddVisitor";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
import Search from "../components/Search";
import VisitorTable from "../components/VisitorTable";
import { useDeleteModalStore, useFormModalStore } from "../features/store";
import { VisitorType } from "../types";
import Container from "../utils/Container";

const Visiteurs = () => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  const [query, setQuery] = useState("");

  const allVisitor = useAppSelector((state) => state.visitor.allVisitors);

  const search = (data: VisitorType[]) => {
    return data.filter(
      (visitor) =>
        visitor &&
        (visitor.name.toLowerCase().includes(query.toLowerCase()) ||
          visitor.firstName.toLowerCase().includes(query.toLowerCase()) ||
          visitor.purpose.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <Container>
      <div className="w-full">
        <div className="flex items-center justify-between mb-5">
          <Search setQuery={setQuery} />
          <div className="w-40 ">
            <BtnAddVisitor />
          </div>
        </div>
        <VisitorTable visitorsData={search(allVisitor)} />
      </div>

      {formModalIsOpen ? <FormVisitor /> : null}
      {deleteModalIsOpen ? <ModaleDelete /> : null}
    </Container>
  );
};

export default Visiteurs;
