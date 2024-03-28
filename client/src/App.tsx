import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Visitors from "./pages/Visitors";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/visiteurs" element={<Visitors />} />
        </Route>
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
