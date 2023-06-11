import Button from "@/components/inputs/Button";
import useFeed from "@/hooks/useFeed";
import Link from "next/link";
import { Fragment } from "react";
import { InView } from "react-intersection-observer";
import Post from "./Post";

export default function Feed() {
  const { data, isFetchingNextPage, fetchNextPage } = useFeed();
  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  return (
    <div>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </Fragment>
      ))}
      {data?.pages.length === 1 && data.pages[0].data.length === 0 && (
        <div className="flex flex-col items-center gap-y-3">
          <div className="mt-5 text-xl text-white">
            Follow at least one user to see your feed
          </div>
          <Link href="/search">
            <Button text="Go to search page" />
          </Link>
        </div>
      )}

      <InView
        as="div"
        className="absolute bottom-0 h-2 w-full bg-transparent"
        onChange={handleNextPage}
      />
    </div>
  );
}
