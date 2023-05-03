import { menuRoutes } from "@/routes/routes";
import SidebarLogo from "./SidebarLogo";
import SideBarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweet from "./SidebarTweet";
import SidebarUser from "./SidebarUser";
export default function Sidebar() {
  return (
    <div className="flex flex-col items-end pr-4 text-white xl:pr-6">
      <div className="fixed top-0 flex h-full flex-col justify-between space-y-2 xl:w-[290px]">
        <div>
          {" "}
          <SidebarLogo />
          {menuRoutes.map(({ name, path, icon }) => (
            <SideBarItem name={name} path={path} icon={icon} key={path} />
          ))}
          <SideBarItem name="Logout" path="" icon={BiLogOut} />
          <SidebarTweet />
        </div>
        <SidebarUser />
      </div>
    </div>
  );
}
