import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AuthType } from "../types";

type Props = {
  type: "number" | "password" | "text";
  placeholder: string;
  isLoading?: boolean;
  register: UseFormRegister<AuthType>;
  errors: FieldErrors<AuthType>;
  required?: boolean;
  id: "name" | "firstName" | "matricule" | "password";
};

const Input = ({
  type,
  placeholder,
  isLoading = false,
  register,
  errors,
  required = true,
  id,
}: Props) => {
  return (
    <div className="flex items-center">
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-lg font-light bg-white border
         ${
           errors[id]
             ? "border-rose-400 focus:ring-rose-600 placeholder-rose-600"
             : "border-gray-400 focus:ring-green-600 placeholder-gray-600"
         } rounded focus:outline-none focus:ring-1`}
        id={id}
        disabled={isLoading}
        autoComplete="off"
        data-testid="input"
        {...register(id, {
          required: {
            value: required,
            message: `Field ${id} is required`,
          },
        })}
      />
    </div>
  );
};

export default Input;
