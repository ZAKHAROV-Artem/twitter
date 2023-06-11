import axios from "axios";
import { Post } from "@prisma/client";

export default async function fetchFeed(page:number) {
  const posts = await axios.get<Post[]>(`/api/posts/feed`,{params:{page}});
  return posts;
}
