interface TextAreaProps {
  name: string;
  id: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: any;
  onBlur: any;
  maxLength?: number;
  className?: string;
}
export default function TextArea({
  id,
  name,
  placeholder,
  error,
  value,
  maxLength,
  onChange,
  onBlur,
  className,
}: TextAreaProps) {
  return (
    <div>
      <textarea
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
