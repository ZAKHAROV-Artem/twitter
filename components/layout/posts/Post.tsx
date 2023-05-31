import Avatar from "@/components/data-display/Avatar";
import useUser from "@/hooks/useUser";
import getMonthName from "@/utils/getDate";
import { Post } from "@prisma/client";
import Image from "next/image";

interface PostProps {
  post: Post;
}
export default function Post({ post }: PostProps) {
  const { user } = useUser(post.username);
  const date = new Date(post.createdAt as Date);
  return (
    <div className="flex  gap-x-3 border-y-[1px] border-y-neutral-800 p-3 text-white duration-200 hover:bg-app-gray-dark/40">
      <div className="">
        <Avatar
          src={user?.profileImage || user?.image || ""}
          size="sm"
          name="Artem Zakharov"
          className="mr-3"
        />
      </div>
      <div className="w-[100%] md:w-[90%]">
        <div className="mb-2 flex">
          <span className="mr-2 font-bold">{user?.name}</span>
          <span className="text-app-gray">@{user?.username}</span>
          <span className="mx-1 text-app-gray">·</span>
          <span className="text-app-gray">{`${getMonthName(
            date.getMonth()
          )} ${date.getDate()}`}</span>
        </div>
        <div>{post.body}</div>
        {post.image && (
          <Image
            className="mt-2 rounded-xl object-cover"
            width={1600}
            height={900}
            src={post.image}
            alt="post"
          />
        )}
      </div>
    </div>
  );
}
