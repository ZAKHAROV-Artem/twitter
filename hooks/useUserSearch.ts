import fetchSearchUsers from "@/services/user/fetchSearchUsers";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "./useDebounce";

const useUserSearch = (query:string) => {
  const debouncedValue = useDebounce(query, 500);
  const res = useQuery({
    queryFn: async () => {
      const data = await fetchSearchUsers(debouncedValue)
      return data
    },
    queryKey: [debouncedValue],
  });
  return {
    ...res,
    users:res.data?.data,
  }
};

export default useUserSearch;
