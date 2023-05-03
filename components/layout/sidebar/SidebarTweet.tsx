import useTweetModal from "@/state/TweetModalState";
import { FaFeatherAlt } from "react-icons/fa";
export default function SidebarTweet() {
  const toggleModal = useTweetModal((state) => state.toggleModal);
  return (
    <div
      onClick={toggleModal}
      className="mt-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-blue-500 duration-200 hover:bg-blue-500/90 xl:w-full"
    >
      <span className="hidden text-xl xl:block">Tweet</span>
      <FaFeatherAlt size={25} color="white" className="block xl:hidden" />
    </div>
  );
}
