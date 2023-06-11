import {  useQuery } from "@tanstack/react-query";
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
