import Button from "@/components/inputs/Button";
import Header from "@/components/layout/header/Header";
import Post from "@/components/layout/posts/Post";
import useFeed from "@/hooks/useFeed";
import { Fragment } from "react";
import { InView } from "react-intersection-observer";
import Link from "next/link";

export default function Home() {
  const { data, isFetchingNextPage, fetchNextPage } = useFeed();
  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  return (
    <div className="relative">
      <Header text="Home" />
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </Fragment>
      ))}
      {data?.pages.length === 1 && data.pages[0].data.length === 0 && (
        <div className="flex gap-y-3 flex-col items-center">
          <div className="mt-5 text-xl text-white">
            Follow at least one user to see your feed
          </div>
            <Link href="/search"><Button text="Go to search page"/></Link>
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
