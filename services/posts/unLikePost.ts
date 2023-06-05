import { Post } from "@prisma/client";
import axios from "axios";

export default async function unLikePost(postId: string) {
  const res = await axios.post<Post>(`/api/posts/unlike`, { postId });
  return res
}
