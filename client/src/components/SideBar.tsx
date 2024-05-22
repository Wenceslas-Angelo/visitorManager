import React from "react";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { sideBarLinks } from "../constants/sideBarLink";
import { logout } from "../features/auth/authSlice";

const SideBar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(logout());

  return (
    <section
      className="sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto pb-5 pt-10 max-md:hidden;
"
    >
      <div className="flex flex-col flex-1 w-full gap-6 px-6">
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
        onClick={() => handleLogout()}
        className="flex items-center justify-start gap-4 p-2 mx-2 text-lg font-medium text-gray-600 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
      >
        <span>
          <MdLogout fontSize={25} />
        </span>
        <p>Déconnexion</p>
      </div>
    </section>
  );
};

export default SideBar;
