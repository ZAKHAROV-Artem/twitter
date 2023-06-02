import { menuAuthRoutes, menuPublicRoutes } from "@/routes/routes";
import SidebarLogo from "./SidebarLogo";
import SideBarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweet from "./SidebarTweet";
import SidebarUser from "./SidebarUser";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { AiOutlineUser } from "react-icons/ai";

export default function Sidebar() {
  const { user, isSuccess } = useCurrentUser();
  return (
    <div className="flex flex-col items-center text-white md:items-end  md:pr-4 xl:pr-6">
      <div className="fixed top-0 flex h-full flex-col justify-between">
        <div className="flex flex-col items-center xl:items-start">
          <SidebarLogo />
          {user && isSuccess ? (
            <>
              {menuAuthRoutes.map(({ name, path, icon }) => (
                <SideBarItem name={name} path={path} icon={icon} key={path} />
              ))}

              <SideBarItem
                name={"Profile"}
                path={`/profile/${user.username}`}
                icon={AiOutlineUser}
                key={user.username}
              />
              <SideBarItem
                onClick={() => signOut()}
                name="Logout"
                path="/"
                icon={BiLogOut}
              />
              <SidebarTweet />
            </>
          ) : (
            <>
              {menuPublicRoutes.map(({ name, path, icon }) => (
                <SideBarItem name={name} path={path} icon={icon} key={path} />
              ))}
            </>
          )}
        </div>
        <SidebarUser />
      </div>
    </div>
  );
}
