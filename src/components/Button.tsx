import React from "react";
import { cn } from "../lib/utils"; // Utility to merge Tailwind classes, optional but recommended

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 hover:bg-purple-700 text-white",
  secondary: "bg-gray-700 hover:bg-gray-600 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "bg-transparent hover:bg-gray-800 text-white border border-gray-700",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center justify-center",
        variantClasses[variant],
        fullWidth ? "w-full" : "w-auto",
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
