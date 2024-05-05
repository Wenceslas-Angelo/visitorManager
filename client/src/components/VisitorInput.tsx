import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { VisitorType } from "../types";
import { purposeData } from "../constants";

type Props = {
  type: "number" | "text";
  placeholder: string;
  isLoading?: boolean;
  register: UseFormRegister<VisitorType>;
  errors: FieldErrors<VisitorType>;
  required?: boolean;
  id: "name" | "firstName" | "nationalId" | "purpose" | "badgeNumber";
  label?: string;
  value?: string | number | undefined;
};

const Input = ({
  type,
  placeholder,
  isLoading = false,
  register,
  errors,
  required = true,
  id,
  label,
  value,
}: Props) => {
  return (
    <div className="flex flex-col w-full m-2">
      <label>{label}</label>
      {id === "purpose" ? (
        <select
          className={`w-full px-4 py-3 text-lg font-light bg-white border
        ${
          errors && errors[id]
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
          defaultValue={value}
        >
          {purposeData.map((purpose) => (
            <option key={purpose} title={purpose}>
              {purpose}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full px-4 py-3 text-lg font-light bg-white border
         ${
           errors && errors[id]
             ? "border-rose-400 focus:ring-rose-600 placeholder-rose-600"
             : "border-gray-400 focus:ring-green-600 placeholder-gray-600"
         } rounded focus:outline-none focus:ring-1`}
          id={id}
          disabled={isLoading}
          autoComplete="off"
          defaultValue={value}
          data-testid="input"
          {...register(id, {
            required: {
              value: required,
              message: `Field ${id} is required`,
            },
          })}
        />
      )}
    </div>
  );
};

export default Input;
