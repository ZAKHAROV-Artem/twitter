import axios from "axios";

export default async function likePost(postId: string) {
  await axios.post(`/api/posts/like`, { postId });
}
