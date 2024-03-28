import React from "react";
import { MdLogout } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import smmcLogo from "../assets/SMMC-Logo.png";
import { sideBarLinks } from "../constants/sideBarLink";
import useAuthStore from "../stores/AuthStore";

const SideBar = () => {
  const { logout } = useAuthStore();
  return (
    <section
      className="sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-gray-300 pb-5 pt-10 max-md:hidden;
"
    >
      <div className="mb-10 flex justify-center">
        <Link to="/">
          <img src={smmcLogo} alt="Logo SMMC" className=" w-40" />
        </Link>
      </div>
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sideBarLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.route}
            className={({ isActive }) =>
              `relative ${
                isActive
                  ? "bg-green-600 text-white"
                  : "bg-white hover:bg-gray-200 text-gray-600"
              } text-lg font-medium flex justify-start items-center gap-4 rounded-lg p-2`
            }
          >
            <span>{link.icon}</span>
            <p>{link.label}</p>
          </NavLink>
        ))}
      </div>
      <div
        onClick={() => logout()}
        className="bg-gray-200 hover:bg-gray-300 text-gray-600 cursor-pointer mx-2 text-lg font-medium flex justify-start items-center rounded-lg p-2 gap-4"
      >
        <span>
          <MdLogout fontSize={25} />
        </span>
        <p>Deconnexion</p>
      </div>
    </section>
  );
};

export default SideBar;
