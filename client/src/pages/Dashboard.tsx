import React from "react";
import CardStat from "../components/CardStat";
import FormVisitor from "../components/FormVisitor";
import Pagination from "../components/Pagination";
import VisitorTable from "../components/VisitorTable";
import {
  useReadAllTodayVisitor,
  useReadAllTodayVisitorIn,
  useReadAllTodayVisitorOut,
} from "../hooks/useVisitorQuery";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";
import Container from "../utils/Container";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { formModalIsOpen } = useVisitorStore();
  const todayAllvisitors = useReadAllTodayVisitor(user ? user.token : "");
  const todayAllvisitorsIn = useReadAllTodayVisitorIn(user ? user.token : "");
  const todayAllvisitorsOut = useReadAllTodayVisitorOut(user ? user.token : "");

  if (
    !todayAllvisitors.data ||
    !todayAllvisitorsIn.data ||
    !todayAllvisitorsOut.data
  ) {
    return;
  }

  return (
    <Container>
      <div className="w-full grid grid-cols-3 mt-10 gap-6">
        <CardStat
          title="Visiteur today"
          number={todayAllvisitors.data.pages[0].totalResults}
        />
        <CardStat
          title="Visiteur Out"
          number={todayAllvisitorsOut.data.pages[0].totalResults}
        />
        <CardStat
          title="Visiteur In"
          number={todayAllvisitorsIn.data.pages[0].totalResults}
        />
      </div>

      <div className="w-full">
        <div className="mt-10 w-full">
          <VisitorTable visitorsData={todayAllvisitors.data.pages[0].results} />
        </div>
        {formModalIsOpen ? (
          <div className="absolute z-30 top-0 left-0 w-full h-screen bg-black/50 ">
            <div className="flex items-center justify-center h-full max-w-3xl mx-auto">
              <FormVisitor />
            </div>
          </div>
        ) : null}
        <Pagination
          totalPages={todayAllvisitors.data.pages[0].totalPages}
          currentPage={todayAllvisitors.data.pages[0].page}
          token={user ? user.token : ""}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
