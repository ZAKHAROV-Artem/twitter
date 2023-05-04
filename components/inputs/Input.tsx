import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  id: string;
  placeholder?: string;
  label?: string;
  error?: string;
  value: string;
  onChange: any;
  onBlur: any;
  max?: string;
}
export default function Input({
  type,
  id,
  name,
  placeholder,
  label,
  error,
  value,
  max,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`
          w-full
          rounded-xl
          border-2
          bg-transparent
          px-3
          py-3
          text-white
          outline-none
          focus:border-blue-500
        `}
        max={max}
      />
      <div className="ml-3 h-4 text-red-500">{error}</div>
    </div>
  );
}
