import { useQuery } from "@tanstack/react-query";
import fetchCurrentUser from "@/services/user/fetchCurrentUser";
import useProvideInfoModal from "@/state/ProvideInfoModalState";

const useCurrentUser = () => {
  const provideInfoModal = useProvideInfoModal();
  const query = useQuery({
    queryFn: fetchCurrentUser,
    queryKey: ["current user"],
    refetchInterval: 10000,
    onSuccess: (data) => {
      if (!data.data.infoProvided) provideInfoModal.openModal();
    },
  });

  return {
    ...query,
    user: query.data?.data,
  };
};

export default useCurrentUser;
