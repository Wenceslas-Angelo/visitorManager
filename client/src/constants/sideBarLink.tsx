import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

export const sideBarLinks = [
  {
    icon: <RxDashboard fontSize={20} />,
    route: "/",
    label: "Dashboard",
  },
  {
    icon: <HiOutlineUserGroup fontSize={25} />,
    route: "/visiteurs",
    label: "Visiteurs",
  },
  {
    icon: <IoSettingsOutline fontSize={23} />,
    route: "/paramettre",
    label: "Paramettre",
  },
];
