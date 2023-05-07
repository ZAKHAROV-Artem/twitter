import useCurrentUser from "@/hooks/useCurrentUser";
import SuggestBar from "./layout/SuggestBar";
import AuthBar from "./layout/footer/AuthBar";
import Sidebar from "./layout/sidebar/Sidebar";

interface Layout {
  children: JSX.Element;
}
export default function Layout({ children }: Layout) {
  return (
    <div className="h-screen bg-black">
      <div className="xl:px-30 container mx-auto h-full max-w-6xl">
        <div className="relative grid h-full grid-cols-4">
          <Sidebar />
          <main className="col-span-3 border-x-[1px] border-neutral-800 lg:col-span-2 ">
            {children}
          </main>
          <SuggestBar />
        </div>
      </div>
      <AuthBar />
    </div>
  );
}
