import { Post } from "@prisma/client";
import axios from "axios";

export default async function likePost(postId: string) {
  const res = await axios.post<Post>(`/api/posts/like`, { postId });
  return res;
}
