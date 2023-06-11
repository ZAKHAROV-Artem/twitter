import { useMutation, useQueryClient } from "@tanstack/react-query";
import createComment from "@/services/comments/createComment";

const useCreateComment = (postId:string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${postId} comments`] });
    },
  });

  return mutation;
};

export default useCreateComment;
