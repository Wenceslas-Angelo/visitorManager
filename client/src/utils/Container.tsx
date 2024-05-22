import React from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="flex flex-row">
        <SideBar />
        <section className="flex min-h-screen flex-1 flex-col items-center px-6">
          {children}
        </section>
      </main>
    </>
  );
};

export default Container;
