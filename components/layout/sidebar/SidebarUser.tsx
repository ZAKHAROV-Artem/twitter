import Avatar from "@/components/data-display/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";

interface SidebarUserProps {}

export default function SidebarUser({}: SidebarUserProps) {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading || !user) return null;

  return (
    <div className="pb-6">
      <div className="flex w-fit gap-x-3 rounded-[50px] p-3 duration-200 hover:bg-gray-300/20  xl:w-full">
        <Avatar
          src={user.profileImage || user.image || ""}
          name={user.name || ""}
          size="sm"
        />
        <div className="hidden xl:block">
          <div className="font-bold">{user.name}</div>
          <div className="text-app-gray">@{user.username}</div>
        </div>
      </div>
    </div>
  );
}
