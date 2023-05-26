import axios from "axios";
import { Post } from "@prisma/client";

export default async function fetchUserPosts(username: string) {
  const posts = await axios.get<Post[]>(`/api/posts/${username}`);
  return posts;
}
