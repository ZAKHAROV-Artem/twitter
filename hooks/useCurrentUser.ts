import useSWR from "swr";
import type { User } from "@prisma/client";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User, Error>(
    "/api/currentuser",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
