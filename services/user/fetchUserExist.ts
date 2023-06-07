import axios from "axios";

export default async function fetchUserExist(username: string) {
  const exist = await axios.get<boolean>(`/api/user/exist`, {
    params: { username },
  });
  return exist;
}
