import moment from "moment";
import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import BtnAddVisitor from "../components/BtnAddVisitor";
import Filtre from "../components/Filtre";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
import Pagination from "../components/Pagination";
import { useDeleteModalStore, useFormModalStore } from "../features/store";
import { VisitorType } from "../types";
import Container from "../utils/Container";

const Visiteurs = () => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const [dateField, setDateField] = useState("");

  const allVisitor = useAppSelector((state) => state.visitor.allVisitors);

  const search = (data: VisitorType[]) => {
    let filteredData = data;

    if (selectedOption !== "all") {
      filteredData = filteredData.filter(
        (visitor) =>
          visitor &&
          visitor.purpose.toLowerCase() === selectedOption.toLowerCase()
      );
    }

    if (dateField !== "") {
      filteredData = filteredData.filter(
        (visitor) =>
          visitor &&
          moment(visitor.startDateTime).format("YYYY-MM-DD") === dateField
      );
    }

    filteredData = filteredData.filter(
      (visitor) =>
        visitor &&
        (visitor.name.toLowerCase().includes(query.toLowerCase()) ||
          visitor.firstName.toLowerCase().includes(query.toLowerCase()))
    );

    return filteredData;
  };

  return (
    <Container>
      <div className="w-full">
        <div className="flex items-center justify-between my-10">
          <Filtre
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            query={query}
            setQuery={setQuery}
            showDateFilter={true}
            dateField={dateField}
            setDateField={setDateField}
          />
          <div className="w-40 ">
            <BtnAddVisitor />
          </div>
        </div>
        <Pagination data={search(allVisitor.visitors)} />
      </div>

      {formModalIsOpen ? <FormVisitor /> : null}
      {deleteModalIsOpen ? <ModaleDelete /> : null}
    </Container>
  );
};

export default Visiteurs;
