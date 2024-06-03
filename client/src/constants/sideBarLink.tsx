import React from "react";
// import { FiSearch } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoEnterOutline, IoLogOutOutline } from "react-icons/io5";
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
    children: [
      {
        icon: <IoEnterOutline fontSize={20} />,
        route: "/today-in",
        label: "Entrées",
      },
      {
        icon: <IoLogOutOutline fontSize={20} />,
        route: "/today-out",
        label: "Sorties",
      },
    ],
  },
  {
    icon: <HiOutlineUserGroup fontSize={25} />,
    route: "/search",
    label: "Rechercher",
  },
];
