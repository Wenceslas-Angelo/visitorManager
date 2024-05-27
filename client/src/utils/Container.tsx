import React from "react";
import { useLocation } from "react-router-dom";
import Filtre from "../components/Filtre";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  const location = useLocation();
  return (
    <>
      <Header />

      <main className="flex flex-row">
        <div className="hidden lg:flex">
          <SideBar />
        </div>
        <section className="flex flex-col items-center flex-1 min-h-screen px-6">
          <div className="flex items-center justify-center w-full py-5 xl:hidden">
            <Filtre showDateFilter={location.pathname === "/visiteurs"} />
          </div>
          {children}
        </section>
      </main>
    </>
  );
};

export default Container;
