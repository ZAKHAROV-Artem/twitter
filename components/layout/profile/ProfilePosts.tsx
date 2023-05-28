import useUserPosts from "@/hooks/useUserPosts";
import { User } from "@prisma/client";
import Post from "../posts/Post";

export default function ProfilePosts({ user }: { user: User }) {
  const { data: posts } = useUserPosts(user.username as string);
  return (
    <div>
      {posts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
