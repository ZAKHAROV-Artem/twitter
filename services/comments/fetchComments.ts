import axios from "axios";
import { Comment } from "@prisma/client";

export default async function fetchComments(postId: string) {
  const comments = await axios.get<Comment[]>(`/api/comments?postId=${postId}`);
  return comments;
}
