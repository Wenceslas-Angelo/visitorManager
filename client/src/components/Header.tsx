import React from "react";
import { HiBars3 } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import smmcLogo from "../assets/SMMC-Logo.png";
import BtnAddVisitor from "./BtnAddVisitor";
import Filtre from "./Filtre";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between px-5 pt-4">
      <div className="flex items-center">
        <div className="flex p-1 mr-5 rounded-md cursor-pointer lg:hidden hover:bg-gray-200">
          <HiBars3 fontSize={32} />
        </div>
        <Link to="/">
          <img src={smmcLogo} alt="Logo SMMC" className="w-40" />
        </Link>
      </div>

      <div className="hidden xl:flex">
        <Filtre showDateFilter={location.pathname === "/visiteurs"} />
      </div>

      <BtnAddVisitor />
    </header>
  );
};

export default Header;
