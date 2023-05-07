import { LegacyRef, forwardRef } from "react";
import DP, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps extends ReactDatePickerProps {
  name: string;
  id: string;
  customInput?: JSX.Element;
  onChange: any;
}

const CustomInput = forwardRef(
  (
    {
      value,
      onClick,
      onChange,
    }: {
      value?: string;
      onClick?: () => void;
      onChange?: () => void;
    },
    ref: LegacyRef<HTMLInputElement>
  ) => (
    <input
      type="text"
      className="w-full rounded-xl border-2 bg-transparent px-3 py-2"
      onClick={onClick}
      onChange={onChange}
      value={value}
      ref={ref}
    />
  )
);
CustomInput.displayName = "CustomInput";

export default function DatePicker({
  name,
  onChange,
  customInput,
  ...rest
}: DatePickerProps) {
  return (
    <div>
      <div className="mb-1 ml-1">Select you birth date</div>
      <DP
        name={name}
        {...rest}
        onChange={(date) => onChange(name, date)}
        customInput={<CustomInput />}
      />
    </div>
  );
}
