import { menuRoutes } from "@/routes/routes";
import SidebarLogo from "./SidebarLogo";
import SideBarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweet from "./SidebarTweet";
export default function Sidebar() {
  return (
    <div className="flex flex-col items-end pr-4 text-white lg:pr-6">
      <div className="space-y-2 lg:w-[230px]">
        <SidebarLogo />
        {menuRoutes.map(({ name, path, icon }) => (
          <SideBarItem name={name} path={path} icon={icon} key={path} />
        ))}
        <SideBarItem name="Logout" path="" icon={BiLogOut} />
        <SidebarTweet />
      </div>
    </div>
  );
}
