import React from "react";
import { ToastContainer } from "react-toastify";
import BtnAddVisitor from "../components/BtnAddVisitor";
import FormVisitor from "../components/FormVisitor";
import Pagination from "../components/Pagination";
import VisitorTable from "../components/VisitorTable";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";
import Container from "../utils/Container";

const Home = () => {
  const { user } = useAuthStore();
  const { formModalIsOpen, visitors } = useVisitorStore();

  return (
    <Container>
      <div className="flex w-full">
        <BtnAddVisitor />
      </div>
      <div className="w-full mt-10">
        <VisitorTable visitorsData={visitors.results} />
      </div>
      {formModalIsOpen ? (
        <div className="absolute top-0 left-0 z-30 w-full h-screen bg-black/50 ">
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
    </Container>
  );
};

export default Home;
