import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import BtnAddVisitor from "../components/BtnAddVisitor";
import CardStat from "../components/CardStat";
import FormVisitor from "../components/FormVisitor";
import Search from "../components/Search";
import VisitorTable from "../components/VisitorTable";
import { useFormModalStore } from "../features/store";
import { readAllToday } from "../features/visitor/visitorSlice";
import { useReadAllVisitorToday } from "../hooks/useVisitorQuery";
import Container from "../utils/Container";

const TodayVisitors = () => {
  const [tab, setTab] = useState<"all" | "out" | "in">("all");
  const { formModalIsOpen } = useFormModalStore();
  const user = useAppSelector((state) => state.auth.user);
  const visitorsToday = useReadAllVisitorToday(user ? user.token : "");
  const dispatch = useAppDispatch();
  const todayVisitor = useAppSelector((state) => state.visitor.todayVisitors);
  const todayVisitorOut = useAppSelector(
    (state) => state.visitor.todayVisitorsOut
  );
  const todayVisitorIn = useAppSelector(
    (state) => state.visitor.todayVisitorsIn
  );

  useEffect(() => {
    if (!visitorsToday.data) return;
    dispatch(readAllToday(visitorsToday.data));
  }, [dispatch, visitorsToday.data]);

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
            title="Visiteur today"
            number={todayVisitor.results.length}
          />
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
          <Search />
          <div className="w-40 ">
            <BtnAddVisitor />
          </div>
        </div>
        <div className="w-full mt-10">
          {tab === "all" ? (
            <VisitorTable visitorsData={todayVisitor.results} />
          ) : tab === "in" ? (
            <VisitorTable visitorsData={todayVisitorIn} visitorActive={true} />
          ) : (
            <VisitorTable visitorsData={todayVisitorOut} />
          )}
        </div>
        {formModalIsOpen ? <FormVisitor /> : null}
      </div>
    </Container>
  );
};

export default TodayVisitors;
