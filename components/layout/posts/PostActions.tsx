import { AiFillHeart, AiOutlineComment } from "react-icons/ai";

interface PostActionsProps {}
export default function PostActions({}: PostActionsProps) {
  return (
    <div className="mb-3 ml-3 mt-2 flex gap-x-5">
      <div className="flex cursor-pointer items-center gap-x-1 text-app-gray  duration-200 hover:text-red-400">
        <AiFillHeart size={30} />
        <span>Like</span>
      </div>
      <div className="flex cursor-pointer items-center gap-x-1 text-app-gray  duration-200 hover:text-green-400">
        <AiOutlineComment size={30} />
        <span>Comment</span>
      </div>
    </div>
  );
}
