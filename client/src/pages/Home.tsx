import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import FormVisitor from "../components/FormVisitor";
import Header from "../components/Header";
import ReactTableCours from "../components/ReactTableCours";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";

const Home = () => {
  const { isAuthenticated, successMsg } = useAuthStore();
  const navigate = useNavigate();
  const { formModalIsOpen } = useVisitorStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (successMsg) {
        toast.success(successMsg);
      }
    }
  }, [navigate, isAuthenticated, successMsg]);

  return (
    <div>
      <Header />
      <div className="px-5 mt-10">
        <ReactTableCours />
      </div>
      {formModalIsOpen ? (
        <div className="absolute top-0 left-0 h-screen w-full bg-black/50 ">
          <div className="flex justify-center items-center h-full max-w-3xl mx-auto">
            <FormVisitor />
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default Home;
