import React from "react";
// import { FiSearch } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
// import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

export const sideBarLinks = [
  {
    icon: <HiOutlineUserGroup fontSize={25} />,
    route: "/visiteurs",
    label: "Visiteurs",
  },
  {
    icon: <RxDashboard fontSize={20} />,
    route: "/today-all",
    label: "Aujourd'hui",
  },
  {
    icon: <RxDashboard fontSize={20} />,
    route: "/today-in",
    label: "Entrees",
  },
  {
    icon: <RxDashboard fontSize={20} />,
    route: "/today-out",
    label: "Sortis",
  },
];
