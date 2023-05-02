import { IconType } from "react-icons";

interface SideBarItem {
  name: string;
  path: string;
  icon: IconType;
}
export default function SideBarItem({ name, path, icon: Icon }: SideBarItem) {
  return (
    <div
      className="
      relative
    flex 
    h-14
    w-14
    cursor-pointer
    items-center 
    justify-center 
    gap-x-5 
    rounded-full 
    p-4
    duration-200
    hover:bg-slate-300/20 
    lg:w-full
  lg:justify-start"
    >
      <Icon size={28} color="white" />{" "}
      <p className="hidden text-xl lg:block">{name}</p>
    </div>
  );
}
