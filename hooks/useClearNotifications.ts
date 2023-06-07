import { useMutation, useQueryClient } from "@tanstack/react-query";
import clearNotifications from "@/services/notifications/clearNotification";

const useClearNotifications = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: clearNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries(["current user"]);
    },
  });

  return mutation;
};

export default useClearNotifications;
