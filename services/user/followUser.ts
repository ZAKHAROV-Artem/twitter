import axios from "axios";
import { User } from "@prisma/client";

export default async function followUser(id: string) {
  return await axios.post<User>(`/api/user/follow`, { id });
}
