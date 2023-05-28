import { useQuery } from "@tanstack/react-query";
import fetchUser from "@/services/user/fetchUser";

const useUser = (username:string) => {
  const query = useQuery({
    queryFn:() => fetchUser(username),
    queryKey: [username],
    retry:false,
  });
  return {
    ...query, user:query.data?.data,
  };
};

export default useUser;
