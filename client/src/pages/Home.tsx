import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAuthStore from "../stores/AuthStore";

const Home = () => {
  const { isAuthenticated, successMsg } = useAuthStore();
  const navigate = useNavigate();
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
      <h1>HELLO GUYS</h1>
      <ToastContainer />
    </div>
  );
};

export default Home;
