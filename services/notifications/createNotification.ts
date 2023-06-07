import axios from "axios";
import { Notification } from "@prisma/client";

interface createNotificationParams {
  type:string;
  postId?:string;
  username:string;
}
export default async function createNotification(params:createNotificationParams) {
  const notification = await axios.post<Notification>(`/api/notifications/`, params);
  return notification;
}
