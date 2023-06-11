import useUserPosts from "@/hooks/useUserPosts";
import { User } from "@prisma/client";
import Post from "../posts/Post";
import { Fragment } from "react";
import { InView } from "react-intersection-observer";

export default function ProfilePosts({ user }: { user: User }) {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserPosts(user.username as string);

  const handleNextPage = async (isView:boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };

  return (
    <div className="relative">
      
      {posts?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </Fragment>
      ))}
       
      <InView
        as="div"
        className="h-2 absolute w-full bottom-0 bg-transparent"
        onChange={handleNextPage}
      />
    </div>
  );
}
