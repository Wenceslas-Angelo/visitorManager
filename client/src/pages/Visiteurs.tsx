import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useAppSelector } from "../app/hooks";
import BtnAddVisitor from "../components/BtnAddVisitor";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
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
          <form className="w-full mt-10">
            <div className="relative">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Rechercher"
                className="px-4 py-2 pl-10 text-lg placeholder-gray-600 border border-gray-400 rounded-lg outline-none focus:border-green-600 focus:ring-green-600"
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute text-gray-400 left-2 font-bold text-xl top-[50%] translate-y-[-50%]">
                <FiSearch />
              </div>
            </div>
          </form>
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
