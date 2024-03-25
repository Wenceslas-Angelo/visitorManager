import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FormVisitor from "../components/FormVisitor";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import VisitorTable from "../components/VisitorTable";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const { formModalIsOpen, readAllVisitors, visitors } = useVisitorStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (user && user.token) {
        readAllVisitors(user.token, 1);
      }
    }
  }, [navigate, isAuthenticated, user, readAllVisitors]);
  return (
    <div>
      <Header />
      <div className="px-5 mt-10">
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
  );
};

export default Home;
