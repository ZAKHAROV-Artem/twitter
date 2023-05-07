import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface SideBarItemProps {
  name: string;
  path: string;
  icon: IconType;
  onClick?: any;
}
export default function SideBarItem({
  name,
  path,
  icon: Icon,
  onClick,
}: SideBarItemProps) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) onClick();
    router.push(path);
  }, [router, onClick, path]);
  return (
    <div
      onClick={handleClick}
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
    xl:w-fit
  xl:justify-start"
    >
      <Icon size={28} color="white" />{" "}
      <p className="hidden pr-3 text-xl xl:block">{name}</p>
    </div>
  );
}
