import { useQuery } from "@tanstack/react-query";
import fetchUserExist from "@/services/user/fetchUserExist";
import useDebounce from "./useDebounce";

const useUserExist = (username: string) => {
  const debouncedValue = useDebounce(username, 500);
  const query = useQuery({
    queryFn: async () => await fetchUserExist(debouncedValue),
    queryKey: [debouncedValue],
    retry:false, 
  });
  return {
    ...query,
    isExist: query.data?.data,
  };
};

export default useUserExist;
