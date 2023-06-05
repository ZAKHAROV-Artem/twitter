import axios from "axios";
import { Comment } from "@prisma/client";

export default async function createComment(values:{body:string,postId:string}) {
  const comment = await axios.post<Comment>(`/api/comments/`, values);
  return comment;
}
