import React from "react";
import AddVisitor from "../components/AddVisitor";
import CardStat from "../components/CardStat";
import FormVisitor from "../components/FormVisitor";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import VisitorTable from "../components/VisitorTable";
import { useReadAllVisitorToday } from "../hooks/useVisitorQuery";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";
import { VisitorType } from "../types";
import Container from "../utils/Container";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { formModalIsOpen } = useVisitorStore();
  const todayAllvisitors = useReadAllVisitorToday(user ? user.token : "", 1);

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
        <CardStat
          title="Visiteur today"
          number={todayAllvisitors.data.totalResults}
        />
        <CardStat title="Visiteur Out" number={visitorOut.length} />
        <CardStat title="Visiteur In" number={visitorIn.length} />
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <Search />
          <div className="w-40 ">
            <AddVisitor />
          </div>
        </div>
        <div className="w-full mt-10">
          <VisitorTable visitorsData={todayAllvisitors.data.results} />
        </div>
        {formModalIsOpen ? (
          <div className="absolute top-0 left-0 z-30 w-full h-screen bg-black/50 ">
            <div className="flex items-center justify-center h-full max-w-3xl mx-auto">
              <FormVisitor />
            </div>
          </div>
        ) : null}
        <Pagination
          totalPages={todayAllvisitors.data.totalPages}
          currentPage={todayAllvisitors.data.page}
          token={user ? user.token : ""}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
