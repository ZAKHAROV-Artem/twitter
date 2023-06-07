import axios from "axios";
import { User } from "@prisma/client";

export default async function provideInfo(username: string) {
  return await axios.post<User>(`/api/user/profideinfo`, { username });
}
