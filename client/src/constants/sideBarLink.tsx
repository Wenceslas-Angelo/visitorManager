import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

export const sideBarLinks = [
  {
    icon: <RxDashboard fontSize={20} />,
    route: "/today",
    label: "Today",
  },
  {
    icon: <HiOutlineUserGroup fontSize={25} />,
    route: "/visiteurs",
    label: "Visiteurs",
  },
  {
    icon: <FiSearch fontSize={25} />,
    route: "/rechercher",
    label: "Rechercher",
  },
  {
    icon: <IoSettingsOutline fontSize={23} />,
    route: "/paramettre",
    label: "Paramettre",
  },
];
