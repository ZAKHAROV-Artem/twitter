import axios from "axios";
import { Notification } from "@prisma/client";

export default async function fetchNotifications(page:number) {
  const notifications = await axios.get<Notification[]>(`/api/notifications`, {params:{page}});
  return notifications;
}
