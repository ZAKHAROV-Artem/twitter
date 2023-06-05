import Comment from "@/components/layout/comments/Comment";
import useComments from "@/hooks/useComments";
import NotFound from "@/pages/404";
import { useRouter } from "next/router";
import Button from "./../../../components/inputs/Button";
import useCommentModal from "@/state/CommentModalState";
import usePost from "@/hooks/usePost";
import  Post  from '@/components/layout/posts/Post';
import { Post as PostType } from "@prisma/client";
import ArrowBack from "@/components/navigation/ArrowBack";

export default function Comments() {
  const router = useRouter();
  const { data,isSuccess} = useComments(router.query.postId as string);
  const { toggleModal } = useCommentModal();
  const post = usePost(router.query.postId as string)
  if (!router.query.postId) return <NotFound />;
  return (
    <div>
      <ArrowBack/>
      {isSuccess&&<Post post={post.data?.data as PostType}/>}
      <div className="flex justify-between my-2 items-center mx-1">
      <div className="text-white text-xl ">Comments {data?.data.length}</div>
      <Button
        text="Write comment"
        onClick={() => toggleModal(router.query.postId as string)}
      /></div>
      <div>
        {data?.data.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>{" "}
    </div>
  );
}
