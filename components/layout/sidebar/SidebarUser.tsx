import Avatar from "@/components/data-display/Avatar";

interface SidebarUserProps {}
export default function SidebarUser({}: SidebarUserProps) {
  return (
    <div className="pb-6">
      <div className="flex w-14 gap-x-3 rounded-[50px] p-3 duration-200 hover:bg-gray-300/20  xl:w-full">
        <Avatar name="Zakharov Artem" size="sm" />
        <div className="hidden xl:block">
          <div className="font-bold ">Zakharov Artem</div>
          <div className="text-app-gray">@szakharovartem</div>
        </div>
      </div>
    </div>
  );
}
