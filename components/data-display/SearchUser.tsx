import { User } from "@prisma/client";
import Avatar from "./Avatar";
import Link from "next/link";

interface SearchUserProps {
  user: User;
}
export default function SearchUser({ user }: SearchUserProps) {
  return (
    <Link
      href={`/profile/${user.username}`}
      className="flex cursor-pointer gap-x-3 p-2 duration-300 hover:bg-slate-300/20"
    >
      <Avatar
        size="md"
        className="p-[2px]"
        src={user.profileImage || user.image || ""}
      />
      <div>
        <div className="font-bold text-white">{user.name}</div>
        <div className="text-app-gray">@{user.username}</div>
      </div>
    </Link>
  );
}
