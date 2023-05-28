import axios from "axios";
import { User } from "@prisma/client";

export default async function fetchCurrentUser() {
  const user = await axios.get<User>("/api/user/current");
  return user;
}
