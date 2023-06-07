import {   useMutation } from "@tanstack/react-query";
import createNotification from "@/services/notifications/createNotification";

const useNotificationCreate = () => {
  const mutation = useMutation({
    mutationFn:createNotification, 
    retry:false,
  });
 

  return mutation;
};

export default useNotificationCreate;
