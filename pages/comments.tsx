import Comment from "@/components/layout/comments/Comment";
import useComments from "@/hooks/useComments";
import NotFound from "@/pages/404";
import { useRouter } from "next/router";
import Button from "../components/inputs/Button";
import useCommentModal from "@/state/CommentModalState";
import usePost from "@/hooks/usePost";
import  Post  from '@/components/layout/posts/Post';
import { Post as PostType } from "@prisma/client";
import ArrowBack from "@/components/navigation/ArrowBack";
import { useEffect, useState } from "react";

export default function Comments() {
  const router = useRouter();
  const {data:post,isError} = usePost(router?.query?.postId as string)
  const { data,isSuccess} = useComments(router?.query?.postId as string );
  const { toggleModal } = useCommentModal();
  if (!router.query.postId || isError) return <NotFound />;

  return (
    <div>
      <ArrowBack/>
      {isSuccess&&<Post post={post?.data as PostType}/>}
      <div className="flex justify-between my-2 items-center mx-1">
      <div className="text-white text-xl ">Comments {data?.data.length}</div>
      <Button
        text="Write comment"
        onClick={() => toggleModal(post?.data.id, post?.data.username)}
      /></div>
      <div>
        {data?.data.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>{" "}
    </div>
  );
}
