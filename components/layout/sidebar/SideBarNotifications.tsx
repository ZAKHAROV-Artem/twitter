import { AiFillBell } from "react-icons/ai";
import { NOTIFICATIONS } from "@/routes/routes";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";

export default function SideBarNotifications() {
  const { user } = useCurrentUser();

  return (
    <Link
      href={NOTIFICATIONS}
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
      <div className="relative">
        <AiFillBell size={28} color="white" />
        {user?.hasNotification && (
          <div className="absolute left-[60%] top-[5%] h-3 w-3 rounded-full bg-red-500" />
        )}
      </div>
      <p className="hidden text-xl xl:block">Notifications</p>
    </Link>
  );
}
