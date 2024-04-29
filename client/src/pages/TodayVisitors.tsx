import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import BtnAddVisitor from "../components/BtnAddVisitor";
import CardStat from "../components/CardStat";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
import VisitorTable from "../components/VisitorTable";
import { useDeleteModalStore, useFormModalStore } from "../features/store";
import { VisitorType } from "../types";
import Container from "../utils/Container";
import Search from "../components/Search";

const TodayVisitors = () => {
  const [tab, setTab] = useState<"all" | "out" | "in">("all");
  const [query, setQuery] = useState("");
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
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
          <Search setQuery={setQuery} />
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
        {deleteModalIsOpen ? <ModaleDelete /> : null}
      </div>
    </Container>
  );
};

export default TodayVisitors;
