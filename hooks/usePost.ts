import { useQuery } from "@tanstack/react-query";
import fetchOnePost from "@/services/posts/fetchOnePost";

const usePost = (postId: string) => {
  const query = useQuery({
    queryFn: () => fetchOnePost(postId),
    queryKey: [postId],
    retry: false,
  });
  return query;
};

export default usePost;
