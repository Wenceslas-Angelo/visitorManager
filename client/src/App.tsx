import React from "react";
import { Route, Routes } from "react-router-dom";
import ActiveVisitors from "./pages/ActiveVisitors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visiteur-active" element={<ActiveVisitors />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
