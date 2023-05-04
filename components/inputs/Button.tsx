import { VscClose } from "react-icons/vsc";

interface ButtonProps {
  type?: "filled" | "outlined";
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
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} w-fit rounded-3xl border border-white px-5 py-2 duration-300 ${
        type === "filled"
          ? "bg-white text-black hover:bg-gray-200 "
          : "text-white hover:bg-white hover:text-black"
      } ${disabled && "border-none bg-gray-400"}`}
    >
      {disabled ? <VscClose size={25} /> : text}
    </button>
  );
}
