import Avatar from "@/components/data-display/Avatar";
import useUser from "@/hooks/useUser";
import getMonthName from "@/utils/getDate";
import { Comment as CommentType } from "@prisma/client";
import Image from "next/image";

interface CommentProps {
  comment: CommentType;
}
export default function Comment({ comment }: CommentProps) {
  const { user } = useUser(comment.username);
  const date = new Date(comment.createdAt as Date);
  return (
    <div className="border-y border-y-neutral-800 hover:bg-app-gray-dark/40 duration-200 ">
      <div className="flex  gap-x-3  p-3 text-white">
        <Avatar
          src={user?.profileImage || user?.image || ""}
          size="sm"
          name="Artem Zakharov"
          className="mr-3"
        />

        <div className="w-[100%] md:w-[90%]">
          <div className="mb-2 flex">
            <span className="mr-2 font-bold">{user?.name}</span>
            <span className="text-app-gray">@{user?.username}</span>
            <span className="mx-1 text-app-gray">·</span>
            <span className="text-app-gray">{`${getMonthName(
              date.getMonth()
            )} ${date.getDate()}`}</span>
          </div>
          <div>{comment.body}</div>
         
        </div>
      </div>
    
    </div>
  );
}
