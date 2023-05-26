import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateUserProfile from "@/services/updateUserProfile";

const useUpdateProfile = (username: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [username] });
    },
  });

  return { ...mutation };
};

export default useUpdateProfile;
