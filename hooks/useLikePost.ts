import fetchUserFollowings from "@/services/user/followUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import { useMemo } from "react";
import unFollowUser from "@/services/user/unFollowUser";
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
      queryClient.invalidateQueries(
        [`${post.username} posts`]
      );
    },
  });
  const unlike = useMutation({
    mutationFn: unLikePost,
    onSuccess: (newPost) => {
      queryClient.invalidateQueries(
        [`${post.username} posts`]
      );
    },
  });
  return {
    isLiked,
    like,
    unlike,
  };
};

export default useLikePost;
