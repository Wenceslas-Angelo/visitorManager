import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useAppSelector } from "../app/hooks";
import BtnAddVisitor from "../components/BtnAddVisitor";
import CardStat from "../components/CardStat";
import FormVisitor from "../components/FormVisitor";
import VisitorTable from "../components/VisitorTable";
import { useFormModalStore } from "../features/store";
import { VisitorType } from "../types";
import Container from "../utils/Container";

const TodayVisitors = () => {
  const [tab, setTab] = useState<"all" | "out" | "in">("all");
  const [query, setQuery] = useState("");
  const { formModalIsOpen } = useFormModalStore();
  const todayVisitor = useAppSelector((state) => state.visitor.todayVisitors);
  const todayVisitorOut = useAppSelector(
    (state) => state.visitor.todayVisitorsOut
  );
  const todayVisitorIn = useAppSelector(
    (state) => state.visitor.todayVisitorsIn
  );

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
      <div className="grid w-full grid-cols-3 gap-6 mt-10">
        <div
          className={`border-b-4 ${
            tab === "all" ? "border-b-green-600" : "border-b-green-100"
          } cursor-pointer rounded-md`}
          onClick={() => setTab("all")}
        >
          <CardStat title="Visiteur today" number={todayVisitor.length} />
        </div>
        <div
          className={`border-b-4 ${
            tab === "out" ? "border-b-green-600" : "border-b-green-100"
          } cursor-pointer rounded-md`}
          onClick={() => setTab("out")}
        >
          <CardStat title="Visiteur Out" number={todayVisitorOut.length} />
        </div>
        <div
          className={`border-b-4 ${
            tab === "in" ? " border-b-green-600" : "border-b-green-100"
          } cursor-pointer rounded-md`}
          onClick={() => setTab("in")}
        >
          <CardStat title="Visiteur In" number={todayVisitorIn.length} />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between">
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
        <div className="w-full mt-10">
          {tab === "all" ? (
            <VisitorTable
              visitorsData={
                todayVisitor.length === 0 ? [] : search(todayVisitor)
              }
            />
          ) : tab === "in" ? (
            <VisitorTable
              visitorsData={search(todayVisitorIn)}
              visitorActive={true}
            />
          ) : (
            <VisitorTable visitorsData={search(todayVisitorOut)} />
          )}
        </div>
        {formModalIsOpen ? <FormVisitor /> : null}
      </div>
    </Container>
  );
};

export default TodayVisitors;
