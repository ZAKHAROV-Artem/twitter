import { Notification } from "@prisma/client";
import Image from "next/image";

interface NotificationProps {
  notification: Notification;
}
export default function Notification({ notification }: NotificationProps) {
  return (
    <div className="border-y border-y-neutral-800 duration-200 hover:bg-app-gray-dark/40 ">
      <div className="flex  items-center gap-x-3  p-3 text-white">
        
        <div className="break-all">{notification.body}</div>
        {notification.image && (
          <Image
            className="mt-2 max-h-[50px]  w-min rounded-sm object-cover"
            width={160}
            height={90}
            src={notification.image}
            alt="post"
          />
        )}
      </div>
    </div>
  );
}
