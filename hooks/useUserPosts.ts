import fetchUserPosts from "@/services/posts/fetchUserPosts";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const useUserPosts = (username: string) => {
  const query = useInfiniteQuery({
    queryKey: [`${username} posts`],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchUserPosts(username, pageParam);
      return res;
    },
    getNextPageParam: (res, pages) => {
      return res.data.length === 10 ? pages.length + 1 : undefined;
    },
  });
  return query;
};

export default useUserPosts;
