import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import CardStat from "../components/CardStat";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
import VisitorTable from "../components/VisitorTable";
import { useDeleteModalStore, useFormModalStore } from "../features/store";
import Container from "../utils/Container";

const TodayVisitors = () => {
  const [tab, setTab] = useState<"all" | "out" | "in">("all");
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  const todayVisitor = useAppSelector((state) => state.visitor.todayVisitors);
  const todayVisitorOut = useAppSelector(
    (state) => state.visitor.todayVisitorsOut
  );
  const todayVisitorIn = useAppSelector(
    (state) => state.visitor.todayVisitorsIn
  );

  return (
    <Container>
      <div className="grid w-full grid-cols-3 gap-6 mt-10">
        <div
          className={`border-b-4 ${
            tab === "all" ? "border-b-green-600" : "border-b-green-100"
          } cursor-pointer rounded-md`}
          onClick={() => setTab("all")}
        >
          <CardStat
            title={todayVisitor.length > 1 ? "Visiteurs" : "Visiteur"}
            number={todayVisitor.length}
          />
        </div>
        <div
          className={`border-b-4 ${
            tab === "out" ? "border-b-green-600" : "border-b-green-100"
          } cursor-pointer rounded-md`}
          onClick={() => setTab("out")}
        >
          <CardStat
            title={todayVisitorOut.length > 1 ? "Sortis" : "Sorti"}
            number={todayVisitorOut.length}
          />
        </div>
        <div
          className={`border-b-4 ${
            tab === "in" ? " border-b-green-600" : "border-b-green-100"
          } cursor-pointer rounded-md`}
          onClick={() => setTab("in")}
        >
          <CardStat
            title={todayVisitorIn.length > 1 ? "Entrées" : "Entrée"}
            number={todayVisitorIn.length}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="w-full mt-10">
          {tab === "all" ? (
            <VisitorTable
              visitorsData={todayVisitor.length === 0 ? [] : todayVisitor}
            />
          ) : tab === "in" ? (
            <VisitorTable visitorsData={todayVisitorIn} visitorActive={true} />
          ) : (
            <VisitorTable visitorsData={todayVisitorOut} />
          )}
        </div>
        {formModalIsOpen ? <FormVisitor /> : null}
        {deleteModalIsOpen ? <ModaleDelete /> : null}
      </div>
    </Container>
  );
};

export default TodayVisitors;
