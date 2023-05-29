import axios from "axios";
import { User } from "@prisma/client";

export default async function fetchSearchUsers(query: string) {
  const users = await axios.get<User[]>("/api/user/search", {
    params:{
      query
    }
  });
  return users;
}
