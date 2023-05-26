import axios from "axios";
import { User } from "@prisma/client";

export default async function updateUserProfile(values: any) {
  const user = await axios.post<User>("/api/profile/update", values);
  return user;
}
