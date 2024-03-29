import React, { useState } from "react";
import BtnAddVisitor from "../components/BtnAddVisitor";
import CardStat from "../components/CardStat";
import FormVisitor from "../components/FormVisitor";
import Search from "../components/Search";
import VisitorTable from "../components/VisitorTable";
import { useReadAllVisitorToday } from "../hooks/useVisitorQuery";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";
import { VisitorType } from "../types";
import Container from "../utils/Container";

const Dashboard = () => {
  const [tab, setTab] = useState<"all" | "out" | "in">("all");
  const { user } = useAuthStore();
  const { formModalIsOpen } = useVisitorStore();
  const todayAllvisitors = useReadAllVisitorToday(user ? user.token : "");

  if (!todayAllvisitors.data) {
    return;
  }

  let visitorIn: VisitorType[] = [];
  let visitorOut: VisitorType[] = [];

  todayAllvisitors.data.results.forEach((visitor) =>
    visitor.endDateTime
      ? (visitorOut = [...visitorOut, visitor])
      : (visitorIn = [...visitorIn, visitor])
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
            title="Visiteur today"
            number={todayAllvisitors.data.totalResults}
          />
        </div>
        <div
          className={`border-b-4 ${
            tab === "out" ? "border-b-green-600" : "border-b-green-100"
          } cursor-pointer rounded-md`}
          onClick={() => setTab("out")}
        >
          <CardStat title="Visiteur Out" number={visitorOut.length} />
        </div>
        <div
          className={`border-b-4 ${
            tab === "in" ? " border-b-green-600" : "border-b-green-100"
          } cursor-pointer rounded-md`}
          onClick={() => setTab("in")}
        >
          <CardStat title="Visiteur In" number={visitorIn.length} />
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
            <VisitorTable visitorsData={todayAllvisitors.data.results} />
          ) : tab === "in" ? (
            <VisitorTable visitorsData={visitorIn} visitorActive={true} />
          ) : (
            <VisitorTable visitorsData={visitorOut} />
          )}
        </div>
        {formModalIsOpen ? (
          <div className="absolute top-0 left-0 z-30 w-full h-screen bg-black/50 ">
            <div className="flex items-center justify-center h-full max-w-3xl mx-auto">
              <FormVisitor />
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default Dashboard;
