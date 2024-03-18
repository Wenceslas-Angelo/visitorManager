import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { VisitorType } from "../types";

type Props = {
  type: "number" | "text";
  placeholder: string;
  isLoading?: boolean;
  register: UseFormRegister<VisitorType>;
  errors: FieldErrors<VisitorType>;
  required?: boolean;
  id: "name" | "firstName" | "nationalId" | "purpose";
  label: string;
};

const purposeData = [
  "Simple visite",
  "Stagiaire",
  "client",
  "Courrier",
  "facture",
  "livraison",
];

const Input = ({
  type,
  placeholder,
  isLoading = false,
  register,
  errors,
  required = true,
  id,
  label,
}: Props) => {
  return (
    <div className="flex flex-col m-2 w-full">
      <label>{label}</label>
      {id === "purpose" ? (
        <select
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
      )}
    </div>
  );
};

export default Input;
