import { useInfiniteQuery } from "@tanstack/react-query";
import fetchNotifications from "@/services/notifications/fetchNotifications";

const useNotifications = () => {
  const query = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchNotifications(pageParam);
      return res;
    },
    getNextPageParam: (res, pages) => {
      return res.data.length === 20 ? pages.length + 1 : undefined;
    },
  });

  return query;
};

export default useNotifications;
