import React from "react";
import SideBar from "../components/SideBar";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <main className="flex flex-row">
      <SideBar />
      <section className="flex min-h-screen flex-1 flex-col items-center px-6">
        {children}
      </section>
    </main>
  );
};

export default Container;
