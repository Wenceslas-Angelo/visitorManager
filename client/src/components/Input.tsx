import React from "react";
import { UseFormRegister } from "react-hook-form";
import { AuthType } from "../types";

type Props = {
  type: "number" | "password" | "text";
  placeholder: string;
  isLoading?: boolean;
  register?: UseFormRegister<AuthType>;
};

const Input = ({ type, placeholder, isLoading = false }: Props) => {
  return (
    <div className="flex items-center">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg font-light placeholder-gray-600 bg-white border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-primary"
        name="email"
        disabled={isLoading}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
