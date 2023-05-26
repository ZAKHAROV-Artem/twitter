import Avatar from "@/components/data-display/Avatar";
import useUser from "@/hooks/useUser";
import getMonthName from "@/utils/getDate";
import { Post } from "@prisma/client";

interface PostProps {
  post: Post;
}
export default function Post({ post }: PostProps) {
  const { user } = useUser(post.username);
  const date = new Date(post.createdAt as Date);
  return (
    <div className="flex gap-x-3 border-y-[1px] border-y-neutral-800 p-3 text-white duration-200 hover:bg-app-gray-dark/40">
      <div>
        <Avatar
          src={user?.profileImage || user?.image || ""}
          size="sm"
          name="Artem Zakharov"
        />
      </div>
      <div>
        <div className="mb-2 flex">
          <span className="mr-2 font-bold">{user?.name}</span>
          <span className="text-app-gray">@{user?.username}</span>
          <span className="mx-1 text-app-gray">·</span>
          <span className="text-app-gray">{`${getMonthName(
            date.getMonth()
          )} ${date.getDay()}`}</span>
        </div>
        <div>{post.body}</div>
      </div>
    </div>
  );
}
