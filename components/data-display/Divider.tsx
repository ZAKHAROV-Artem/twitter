interface DividerProps {
  text: string;
}
export default function Divider({ text }: DividerProps) {
  return (
    <div className="flex items-center gap-x-3">
      <div className="h-[1px] w-full bg-app-gray" />
      <div className="mb-[4px]">{text}</div>
      <div className="h-[1px] w-full bg-app-gray" />
    </div>
  );
}
