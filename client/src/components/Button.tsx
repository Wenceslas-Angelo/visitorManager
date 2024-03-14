import React from "react";

type Props = {
  children: React.ReactNode;
  type: "submit" | "button";
};

const Button = ({ children, type }: Props) => {
  return (
    <button
      type={type}
      className="relative flex-shrink-0 w-full py-3 text-lg font-medium text-white bg-indigo-600 rounded hover:bg-primary-400"
    >
      {children}
    </button>
  );
};

export default Button;
