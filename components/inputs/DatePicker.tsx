import DP, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps extends ReactDatePickerProps {
  name: string;
  id: string;
  customInput?: JSX.Element;
  onChange: any;
}

function CustomInput({
  value,
  onClick,
  onChange,
}: {
  value?: string;
  onClick?: () => void;
  onChange?: () => void;
}) {
  return (
    <input
      type="text"
      className="w-full rounded-xl border-2 bg-transparent px-3 py-2"
      onClick={onClick}
      onChange={onChange}
      value={value}
    />
  );
}

export default function DatePicker({
  name,
  onChange,
  customInput,
  ...rest
}: DatePickerProps) {
  return (
    <DP
      name={name}
      {...rest}
      onChange={(date) => onChange(name, date)}
      customInput={<CustomInput />}
    />
  );
}
