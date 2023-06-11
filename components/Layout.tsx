import useCurrentUser from "@/hooks/useCurrentUser";
import SuggestBar from "./layout/SuggestBar";
import AuthBar from "./layout/footer/AuthBar";
import Sidebar from "./layout/sidebar/Sidebar";
import Head from "next/head";

interface Layout {
  children: JSX.Element;
}
export default function Layout({ children }: Layout) {
  const { user, isSuccess } = useCurrentUser();

  return (
    <div className="h-screen bg-black">
      <Head>
        <title>Twitter</title>
      </Head>
      <div className="xl:px-30 container mx-auto h-full max-w-6xl">
        <div className="relative grid h-full grid-cols-[80px_repeat(3,1fr)] md:grid-cols-[200px_repeat(3,1fr)]">
          <Sidebar />
          <main className="col-span-3 border-x-[1px] border-neutral-800 lg:col-span-2 ">
            {children}
          </main>
          <SuggestBar />
        </div>
      </div>
      {!isSuccess && <AuthBar />}
    </div>
  );
}
