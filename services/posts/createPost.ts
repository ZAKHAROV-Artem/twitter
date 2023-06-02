import axios from "axios";
import { Post } from "@prisma/client";

export default async function createPost(values:{body:string,image:string}) {
  const post = await axios.post<Post>(`/api/posts/create`, values);
  return post;
}
