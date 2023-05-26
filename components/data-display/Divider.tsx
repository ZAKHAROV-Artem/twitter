interface DividerProps {
  text?: string;
  className?: string;
}
export default function Divider({ text, className }: DividerProps) {
  return (
    <div className={`flex items-center ${text && "gap-x-3"} ${className}`}>
      <div className="h-[1px] w-full bg-neutral-800" />
      <div className="mb-[4px]">{text}</div>
      <div className="h-[1px] w-full bg-neutral-800" />
    </div>
  );
}
