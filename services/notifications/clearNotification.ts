import axios from "axios";

export default async function clearNotifications() {
  const res = await axios.post<string>(`/api/notifications/clear`);
  return res;
}
