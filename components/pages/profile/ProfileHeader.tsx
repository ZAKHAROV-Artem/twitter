import Image from "next/image";
import Avatar from "@/components/data-display/Avatar";
import Button from "@/components/inputs/Button";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineLink, AiOutlineCalendar } from "react-icons/ai";
import Header from "@/components/layout/header/Header";
import useEditProfileModal from "@/state/EditProfileModalState";
import Link from "next/link";
import { User } from "@prisma/client";
import useCurrentUser from "@/hooks/useCurrentUser";
import getMonthName from "@/utils/getDate";

function extractRootDomain(url: string) {
  var a = document.createElement("a");
  a.href = url;
  return a.hostname;
}

export default function ProfileHeader({ user }: { user: User | undefined }) {
  const { user: currentUser } = useCurrentUser();
  const date = new Date(user?.createdAt as Date);
  const toggleModal = useEditProfileModal((state) => state.toggleModal);

  return (
    <div>
      <Header text="Profile" />
      <div className="relative h-[270px] w-full">
        {user?.coverImage ? (
          <Image
            src={user.coverImage}
            width={1600}
            height={900}
            quality={100}
            priority
            className="h-52 w-full object-cover"
            alt="Profile cover"
          />
        ) : (
          <div className="h-52 w-full bg-gray-300/30" />
        )}

      <Avatar
          src={user?.profileImage || user?.image || ""}
          name={user?.name || ""}
          size="lg"
          className="absolute bottom-0 mx-5 border-4 border-black"
        />
        {user?.id === currentUser?.id && (
          <div className="mt-3 flex w-full justify-end pr-3">
            <Button
              onClick={toggleModal}
              text="Edit profile"
              type="outlined"
              className="font-bold"
            />
          </div>
        )}
      </div>
      <div className="mx-3 mt-5 flex flex-col gap-y-3">
        <div>
          <div className="font-[900] text-white">{user?.name}</div>
          <div className="text-app-gray">@{user?.username}</div>
        </div>
        {user?.bio?.length && <div className="text-white">{user?.bio}</div>}
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {user?.location && (
            <div className="flex items-center gap-x-1 text-app-gray">
              <SlLocationPin size={20} />
              <span>{user?.location}</span>
            </div>
          )}
          {user?.site && (
            <div className="flex items-center gap-x-1 text-app-gray">
              <AiOutlineLink size={20} />
              <span className="text-blue-400">
                <Link href={user?.site || ""} target="_blank">
                  {extractRootDomain(user?.site || "")}
                </Link>
              </span>
            </div>
          )}
          <div className="flex items-center gap-x-1 text-app-gray">
            <AiOutlineCalendar size={20} />
            <span>
              Joined {`${getMonthName(date.getMonth())} ${date.getFullYear()}`}
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
