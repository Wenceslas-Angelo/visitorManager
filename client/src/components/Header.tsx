import React from "react";
import { HiBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import smmcLogo from "../assets/SMMC-Logo.png";
import BtnAddVisitor from "./BtnAddVisitor";
import Filtre from "./Filtre";

const Header = () => {
  return (
    <header className="py-2 px-5 flex justify-between items-center">
      <div className="flex items-center">
        <div className="cursor-pointer mr-5">
          <HiBars3 fontSize={32} />
        </div>
        <Link to="/">
          <img src={smmcLogo} alt="Logo SMMC" className="w-40" />
        </Link>
      </div>

      <Filtre />

      <BtnAddVisitor />
    </header>
  );
};

export default Header;
