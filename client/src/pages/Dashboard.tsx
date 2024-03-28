import React, { useEffect } from "react";
import CardStat from "../components/CardStat";
import FormVisitor from "../components/FormVisitor";
import Pagination from "../components/Pagination";
import VisitorTable from "../components/VisitorTable";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";
import Container from "../utils/Container";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { formModalIsOpen, readAllVisitors, visitors } = useVisitorStore();

  useEffect(() => {
    if (isAuthenticated && user && user.token) {
      readAllVisitors(user.token, 1);
    }
  }, [isAuthenticated, user, readAllVisitors]);

  return (
    <Container>
      <div className="w-full grid grid-cols-3 mt-10 gap-6">
        <CardStat title="Visiteur today" number={120} />
        <CardStat title="Visiteur Out" number={20} />
        <CardStat title="Visiteur In" number={100} />
      </div>

      <div className="w-full">
        <div className="mt-10 w-full">
          <VisitorTable visitorsData={visitors.results} />
        </div>
        {formModalIsOpen ? (
          <div className="absolute z-30 top-0 left-0 w-full h-screen bg-black/50 ">
            <div className="flex items-center justify-center h-full max-w-3xl mx-auto">
              <FormVisitor />
            </div>
          </div>
        ) : null}
        <Pagination
          totalPages={visitors.totalPages}
          currentPage={visitors.page}
          token={user ? user.token : ""}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
