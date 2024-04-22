import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import BtnAddVisitor from "../components/BtnAddVisitor";
import FormVisitor from "../components/FormVisitor";
import VisitorTable from "../components/VisitorTable";
import { useFormModalStore } from "../features/store";
import { readAllVisitors } from "../features/visitor/visitorSlice";
import { useReadAllVisitors } from "../hooks/useVisitorQuery";
import { VisitorType } from "../types";
import Container from "../utils/Container";

const Visiteurs = () => {
  const { formModalIsOpen } = useFormModalStore();
  const [query, setQuery] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const allVisitorQuery = useReadAllVisitors(user ? user.token : "");
  const allVisitor = useAppSelector((state) => state.visitor.allVisitors);

  useEffect(() => {
    if (!allVisitorQuery.data) return;
    dispatch(readAllVisitors(allVisitorQuery.data));
  }, [dispatch, allVisitorQuery.data]);

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
    </Container>
  );
};

export default Visiteurs;
