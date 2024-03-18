import React from "react";
import { FaChevronDown, FaRegUser } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

import smmcLogo from "../assets/SMMC-Logo.png";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";
import Button from "./Button";

const Header = () => {
  const { user } = useAuthStore();
  const { setFormModalIsOpen } = useVisitorStore();
  return (
    <header className="flex justify-between items-center px-2 py-1">
      <div className="">
        <img src={smmcLogo} alt="Logo SMMC" className=" w-44" />
      </div>

      <div className="flex items-center">
        <Button type="button" variant="primary" size="small">
          <div
            className="flex items-center"
            onClick={() => setFormModalIsOpen()}
          >
            <span className="text-xl">
              <IoMdAdd />
            </span>
            Add Visitor
          </div>
        </Button>

        <div className="cursor-pointer hover:bg-gray-100 border border-gray-200 px-2 py-1 flex items-center rounded-md ml-5 text-lg">
          <div className="border p-2 rounded-full">
            <FaRegUser />
          </div>
          <div className="px-2">
            <p className="text-[16px] flex w-20">
              {user ? `W. ${user.firstName}` : "Unknown firstName"}
            </p>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
          <div>
            <FaChevronDown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
