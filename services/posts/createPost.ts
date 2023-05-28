import axios from "axios";
import { Post } from "@prisma/client";

export default async function createPost(body:string) {
  const post = await axios.post<Post>(`/api/posts/create`, {
    body,
  });
  return post;
}
