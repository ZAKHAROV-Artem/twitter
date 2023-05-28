import axios from "axios";
import { User } from "@prisma/client";

export default async function fetchUser(username:string,) {
  const user = await axios.get<User>(`/api/user/${username}`);
  return user;
}
