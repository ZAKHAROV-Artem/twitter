import { useQuery } from "@tanstack/react-query";
import fetchCurrentUser from "@/services/user/fetchCurrentUser";
import { signOut } from "next-auth/react";

const useCurrentUser = () => {
  const query = useQuery({
    queryFn: fetchCurrentUser,
    queryKey: ["current user"],
    retry:false,
  });
  return {
    ...query, user:query.data?.data,
  };
};

export default useCurrentUser;
