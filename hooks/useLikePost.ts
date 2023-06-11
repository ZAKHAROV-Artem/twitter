import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";
import { useMemo } from "react";
import likePost from "@/services/posts/likePost";
import unLikePost from "@/services/posts/unLikePost";
import { Post } from "@prisma/client";

const useLikePost = (post: Post) => {
  const { user } = useCurrentUser();
  const isLiked = useMemo(() => {
    const list = post?.likedIds || [];
    return list.includes(user?.id as string);
  }, [user?.id, post?.likedIds]);

  const queryClient = useQueryClient();
  const like = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries([`${post.username} posts`]);
      queryClient.invalidateQueries([post.id]);
    },
  });
  const unlike = useMutation({
    mutationFn: unLikePost,
    onSuccess: () => {
      queryClient.invalidateQueries([`${post.username} posts`]);
      queryClient.invalidateQueries([post.id]);
    },
  });
  return {
    isLiked,
    like,
    unlike,
  };
};

export default useLikePost;
