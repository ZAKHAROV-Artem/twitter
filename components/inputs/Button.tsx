import { VscClose } from "react-icons/vsc";

interface ButtonProps {
  type?: "filled" | "outlined";
  color?: "blue";
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
export default function Button({
  type = "filled",
  text,
  onClick,
  className,
  disabled,
  color,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} w-fit rounded-3xl  px-5 py-2 duration-300 
      ${type === "filled" && !color && "bg-white text-black hover:bg-gray-200 "}
      ${
        type === "outlined" &&
        !color &&
        "border border-white text-white hover:bg-white hover:text-black"
      } ${color === "blue" && "bg-blue-500 text-white hover:bg-blue-500/90 "}
      ${disabled && "border-none bg-gray-400"}
      `}
    >
      {disabled ? <VscClose size={25} /> : text}
    </button>
  );
}
