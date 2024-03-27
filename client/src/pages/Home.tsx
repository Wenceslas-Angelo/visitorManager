import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FormVisitor from "../components/FormVisitor";
import Pagination from "../components/Pagination";
import SideBar from "../components/SideBar";
import VisitorTable from "../components/VisitorTable";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const { formModalIsOpen, readAllVisitors, visitors } = useVisitorStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/connexion");
    } else {
      if (user && user.token) {
        readAllVisitors(user.token, 1);
      }
    }
  }, [navigate, isAuthenticated, user, readAllVisitors]);
  return (
    <main className="flex flex-row">
      <SideBar />
      <div className="flex min-h-screen flex-1 flex-col items-center px-6">
        <div className="mt-10 w-full">
          <VisitorTable visitorsData={visitors.results} />
        </div>
        {formModalIsOpen ? (
          <div className="absolute top-0 left-0 w-full h-screen bg-black/50 ">
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
        <ToastContainer />
      </div>
    </main>
  );
};

export default Home;
