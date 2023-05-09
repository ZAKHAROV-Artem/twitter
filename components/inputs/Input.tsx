import { HTMLInputTypeAttribute, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
interface InputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  id: string;
  placeholder?: string;
  label?: string;
  error?: string;
  value: string;
  onChange: any;
  onBlur?: any;
  maxLength?: number;
  className?: string;
}
export default function Input({
  type,
  id,
  name,
  placeholder,
  label,
  error,
  value,
  maxLength,
  onChange,
  onBlur,
  className,
}: InputProps) {
  const [visible, setVisible] = useState<boolean>(false);
  if (type === "password") {
    return (
      <div>
        <div
          className={`
        flex    
        w-full 
        items-center
        gap-x-3
        rounded-xl
        border-2
        px-3
      py-3  text-white 
      focus:border-blue-500 `}
        >
          <input
            type={visible ? "text" : "password"}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            maxLength={maxLength}
            className={`
          w-full  
          bg-transparent 
          outline-none 
        `}
          />
          <div onClick={() => setVisible(!visible)}>
            {visible ? (
              <AiFillEye size={25} />
            ) : (
              <AiFillEyeInvisible size={25} />
            )}
          </div>
        </div>
        <div className="ml-3 h-4 text-red-500">{error}</div>
      </div>
    );
  } else {
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
          maxLength={maxLength}
          className={`
          w-full
          rounded-xl
          border-2
          bg-transparent
          px-3
          py-3
          text-white
          outline-none
          focus:border-blue-500  ${className}
        `}
        />
        <div className="ml-3 h-4 text-red-500">{error}</div>
      </div>
    );
  }
}
