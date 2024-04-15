import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodayVisitors from "./pages/TodayVisitors";
import Visiteurs from "./pages/Visiteurs";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/today" element={<TodayVisitors />} />
          <Route path="/visiteurs" element={<Visiteurs />} />
        </Route>
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
