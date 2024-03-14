import React from "react";

type Props = {
  type: "number" | "password" | "text";
  placeholder: string;
};

const Input = ({ type, placeholder }: Props) => {
  return (
    <div className="flex items-center">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg font-light placeholder-gray-600 bg-white border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-primary"
        name="email"
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
