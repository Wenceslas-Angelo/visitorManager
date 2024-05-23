import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodayIn from "./pages/TodayIn";
import TodayOut from "./pages/TodayOut";
import TodayAll from "./pages/TodayAll";
import Visiteurs from "./pages/Visiteurs";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/visiteurs" element={<Visiteurs />} />
          <Route path="/today-all" element={<TodayAll />} />
          <Route path="/today-in" element={<TodayIn />} />
          <Route path="/today-out" element={<TodayOut />} />
        </Route>
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
