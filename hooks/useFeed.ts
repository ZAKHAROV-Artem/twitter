import fetchFeed from "@/services/posts/fetchFeed";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFeed = () => {
  const query = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchFeed(pageParam);
      return res;
    },
    queryKey: ["current user feed"],
    getNextPageParam: (res, pages) => {
      return res.data.length === 10 ? pages.length + 1 : undefined;
    },
  });

  return query;
};

export default useFeed;
