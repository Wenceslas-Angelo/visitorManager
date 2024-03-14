import React from "react";

type Props = {
  children: React.ReactNode;
  type: "submit" | "button";
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "outline" | "icon" | "disabled";
  disabled?: boolean;
  isLoading?: boolean;
};

const Button = ({
  children,
  type,
  size = "medium",
  variant = "primary",
  disabled = false,
}: Props) => {
  let variantStyles: string = "";
  let sizeStyles: string = "";

  switch (variant) {
    case "primary":
      variantStyles = "bg-green-600 hover:bg-green-500 text-white rounded-lg";
      break;
    case "secondary":
      variantStyles =
        "bg-green-200 hover:bg-green-300/50 text-green-600 rounded-lg";
      break;
    case "outline":
      variantStyles =
        "bg-white hover:bg-gray-400/50 border border-gray-500 text-gray-900 rounded-lg";
      break;

    case "disabled":
      variantStyles =
        "bg-gray-400 border border-gray-500 text-gray-600 rounded-lg cursor-not-allowed";
      break;

    case "icon":
      variantStyles = "";
      break;
  }

  switch (size) {
    case "small":
      sizeStyles = "font-medium text-lg";
      break;
    case "medium":
      sizeStyles = "font-semibold text-xl";
      break;
    case "large":
      sizeStyles = "font-bold text-2xl";
      break;
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${variantStyles} ${sizeStyles} px-2 py-2 capitalize w-full transition-all`}
    >
      {children}
    </button>
  );
};

export default Button;
