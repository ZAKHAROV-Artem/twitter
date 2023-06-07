import provideInfo from "@/services/user/provideInfo";
import { useMutation, useQueryClient, } from "@tanstack/react-query";

const useProvideInfo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn:provideInfo,
    onSuccess:()=>{
      queryClient.invalidateQueries(['current user'])
    },
  })
  return mutation;
};

export default useProvideInfo;
