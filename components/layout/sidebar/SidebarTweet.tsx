import { BiPen } from "react-icons/bi";

export default function SidebarTweet() {
  return (
    <div>
      <div className="mt-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-blue-500 duration-200 hover:bg-blue-500/90 lg:w-full">
        <span className="hidden text-xl lg:block">Tweet</span>
        <BiPen size={28} color="white" className="block lg:hidden" />
      </div>
    </div>
  );
}
