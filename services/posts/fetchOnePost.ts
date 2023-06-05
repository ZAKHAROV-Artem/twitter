import axios from "axios";
import { Post } from "@prisma/client";

export default async function fetchOnePost(postId: string) {
  const post = await axios.get<Post>(`/api/posts/getOne?postId=${postId}`);
  return post;
}
