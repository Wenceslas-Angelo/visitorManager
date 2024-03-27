import React from "react";
import { FaChevronDown, FaRegUser } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";
import Button from "./Button";

const Header = () => {
  const { user, logout } = useAuthStore();
  const { setFormModalIsOpen } = useVisitorStore();
  return (
    <header className="flex items-center justify-between px-2 py-1">
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

        <div className="flex items-center px-2 py-1 ml-5 text-lg border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100">
          <div className="p-2 border rounded-full">
            <FaRegUser />
          </div>
          <div className="px-2" onClick={() => logout()}>
            <p className="text-[16px] flex w-20">
              {user ? `${user.firstName}` : "Unknown firstName"}
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
