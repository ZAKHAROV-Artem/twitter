import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import { useMemo } from "react";
import followUser from "@/services/user/followUser";
import unFollowUser from "@/services/user/unFollowUser";

const useFollow = (username: string) => {
  const {user:currentUser} = useCurrentUser();
  const {user} = useUser(username);

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(user?.id as string);
  }, [currentUser?.followingIds, user?.id,]);

  const queryClient = useQueryClient();
  const follow = useMutation({
    mutationFn:followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [user?.username] });
      queryClient.invalidateQueries({ queryKey: ["current user"] });
      queryClient.removeQueries({ queryKey: ["current user feed"] });
    },
  })
  const unFollow = useMutation({
    mutationFn:unFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [user?.username] });
      queryClient.invalidateQueries({ queryKey: ["current user"] });
      queryClient.removeQueries({ queryKey: ["current user feed"] });
    },
  })
  return {
    isFollowing,
    follow,unFollow
  };
};

export default useFollow;
