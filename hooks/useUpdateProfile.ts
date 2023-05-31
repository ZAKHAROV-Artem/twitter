import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateUserProfile from "@/services/user/updateUserProfile";
import useCurrentUser from "./useCurrentUser";

const useUpdateProfile = () => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [user?.username] });
      queryClient.invalidateQueries({ queryKey: ["current user"] });
    },
  });

  return { ...mutation };
};

export default useUpdateProfile;
