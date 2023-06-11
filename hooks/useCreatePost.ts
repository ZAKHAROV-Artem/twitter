import { useMutation, useQueryClient } from "@tanstack/react-query";
import createPost from "@/services/posts/createPost";
import useCurrentUser from "./useCurrentUser";

const useCreatePost = () => {
  const {user} = useCurrentUser();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${user?.username} posts`] });
    },
  });

  return mutation;
};

export default useCreatePost;
