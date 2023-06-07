import axios from "axios";
import { Post } from "@prisma/client";

export default async function fetchUserPosts(username: string, page:number) {
  const posts = await axios.get<Post[]>(`/api/posts/${username}`,{params:{page}});
  return posts;
}
