import {  useQuery, useQueryClient } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";
import createComment from "@/services/comments/createComment";
import fetchComments from "@/services/comments/fetchComments";

const useComments = (postId:string) => {
  const query = useQuery({
    queryFn: ()=>fetchComments(postId),
    retry:false,
    queryKey: [`${postId} comments`]
  });

  return { ...query };
};

export default useComments;
