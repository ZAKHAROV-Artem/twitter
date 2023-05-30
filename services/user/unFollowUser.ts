import axios from "axios";
import { User } from "@prisma/client";

export default async function unFollowUser(id: string) {
  return await axios.post<User>(`/api/user/unfollow`, { id });
}
