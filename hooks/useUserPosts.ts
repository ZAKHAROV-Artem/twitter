import fetchUserPosts from "@/services/posts/fetchUserPosts";
import { useQuery } from "@tanstack/react-query";

const useUserPosts = (username:string) => {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryFn:() => fetchUserPosts(username),
    queryKey: [`${username} posts`],
    retry:false,
  });
  return {
    data: data?.data,
    error,
    isLoading,
    isSuccess,
  };
};

export default useUserPosts;
