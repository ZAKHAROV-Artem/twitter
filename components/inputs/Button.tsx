import { ButtonHTMLAttributes } from "react";
import { VscClose } from "react-icons/vsc";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  color?: "blue"|"red";
  text: string;
}
export default function Button({
  variant = "filled",
  text,
  disabled,
  className,
  color,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${className} ${disabled && "cursor-not-allowed"} border  w-fit rounded-3xl  px-5 py-2 duration-300 

      ${variant === "filled" && !color &&"bg-white text-black hover:bg-gray-200"}
      ${variant === "outlined" && !color && "border-white text-white hover:bg-white hover:text-black"} 
     
      ${color === "blue" && variant === "filled" && "border-none bg-blue-500 text-white hover:bg-blue-500/90 "}
      ${color === "blue" && variant === "outlined" && " text-white hover:bg-blue-500/90 "}
      ${color === "red" && variant === "filled" && "border-none bg-red-500 text-white hover:bg-red-500/90 "}
      ${color === "red" && variant === "outlined" && " border-white text-white hover:border-red-500 hover:text-red-500 "}
      
      ${disabled && "border-none bg-gray-400"}`}
      {...rest}
    >
      {disabled ? <VscClose size={25} /> : text}
    </button>
  );
}
