import useCurrentUser from "@/hooks/useCurrentUser";
import useLikePost from "@/hooks/useLikePost";
import useNotificationCreate from "@/hooks/useNotificationCreate";
import useNotifications from "@/hooks/useNotifications";
import useUser from "@/hooks/useUser";
import useCommentModal from "@/state/CommentModalState";
import { Comment, Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";

interface PostActionsProps {
  post: Post;
}
export default function PostActions({ post }: PostActionsProps) {
  const { isLiked, like, unlike } = useLikePost(post);
  const {mutateAsync} = useNotificationCreate();

  const handleLike = async () => {
    if (isLiked) {
      await unlike.mutateAsync(post.id);
    } else {
      await like.mutateAsync(post.id);
      await mutateAsync({type:"like",postId:post.id,username:post.username})
    }
  };
  return (
    <div className="mb-3 ml-3 mt-2 flex gap-x-5">
      <div
        onClick={handleLike}
        className={`flex cursor-pointer items-center gap-x-1 text-app-gray  duration-200  ${
          isLiked
            ? "text-red-400 hover:text-app-gray"
            : "text-app-gray hover:text-red-400"
        }`}
      >
        <AiFillHeart size={30} />
        <span>Likes {post.likedIds.length}</span>
      </div>
      <Link
        href={`${post.username}/comments?postId=${post.id}`}
        className="flex cursor-pointer items-center gap-x-1 text-app-gray  duration-200 hover:text-green-400"
      >
        <AiOutlineComment size={30} />
        <span>Comments</span>
      </Link>
    </div>
  );
}
