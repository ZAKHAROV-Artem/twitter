import Image from "next/image";
import Avatar from "@/components/data-display/Avatar";
import Button from "@/components/inputs/Button";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineLink, AiOutlineCalendar } from "react-icons/ai";
import Header from "@/components/layout/header/Header";
import useCurrentUser from "@/hooks/useCurrentUser";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function ProfileHeader() {
  const { data: user } = useCurrentUser();
  const date = new Date(user?.createdAt as Date);
  return (
    <div>
      <Header text="Profile" />
      <div className="relative h-[270px]">
        {user?.coverImage ? (
          <Image src={user.coverImage} alt="Profile cover" />
        ) : (
          <div className="h-52 w-full bg-gray-300/30" />
        )}

        <Avatar
          size="lg"
          name={user?.name || ""}
          className="absolute bottom-0 mx-5 border-4 border-black"
        />
        <div className="mt-3 flex w-full justify-end pr-3">
          <Button text="Edit profile" type="outlined" className="font-bold" />
        </div>
      </div>
      <div className="mx-3 mt-5 flex flex-col gap-y-3">
        <div>
          <div className="font-[900] text-white">{user?.name}</div>
          <div className="text-app-gray">@{user?.username}</div>
        </div>
        {user?.bio?.length && <div className="text-white">{user?.bio}</div>}
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <div className="flex items-center gap-x-1 text-app-gray">
            <SlLocationPin size={20} />
            <span>Ukraine</span>
          </div>
          <div className="flex items-center gap-x-1 text-app-gray">
            <AiOutlineLink size={20} />
            <span className="text-blue-400">zakharov-artem.vercel.app</span>
          </div>
          <div className="flex items-center gap-x-1 text-app-gray">
            <AiOutlineCalendar size={20} />
            <span>
              Joined {`${monthNames[date.getMonth()]} ${date.getFullYear()}`}
            </span>
          </div>
        </div>

        <div>
          <span className="font-bold text-white">
            {user?.followingIds.length}
          </span>
          <span className="ml-1 text-app-gray">Following</span>
        </div>
      </div>
    </div>
  );
}
