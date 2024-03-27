import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Visitors from "./pages/Visitors";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visiteurs" element={<Visitors />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
