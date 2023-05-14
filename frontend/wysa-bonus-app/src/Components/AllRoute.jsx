import React from "react";

import { Routes, Route } from "react-router-dom";
import Efficiency from "../Pages/Efficiency";
import GoOutofBed from "../Pages/GoOutofBed";
import GotoBed from "../Pages/GotoBed";
import HomePage from "../Pages/HomePage";
import SleepHours from "../Pages/SleepHours";
import SleepStruggle from "../Pages/SleepStruggle";

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sleepstruggle" element={<SleepStruggle />} />
      <Route path="/gotobed" element={<GotoBed />} />
      <Route path="/gooutofbed" element={<GoOutofBed />} />
      <Route path="/sleephours" element={<SleepHours />} />
      <Route path="/efficiency" element={<Efficiency />} />
    </Routes>
  );
};

export default AllRoute;
