import { useQuery } from "@tanstack/react-query";
import fetchCurrentUser from "@/services/user/fetchCurrentUser";

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
