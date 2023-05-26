import { IconType } from "react-icons";
import {
  AiOutlineTwitter,
  AiFillHome,
  AiFillBell,
  AiOutlineUser,
} from "react-icons/ai";

interface Route {
  name: string;
  path: string;
  icon: IconType;
}

export const HOME = "/";
export const NOTIFICATIONS = "/notifications";
export const PROFILE = "/profile";

export const menuAuthRoutes: Route[] = [
  {
    name: "Home",
    path: HOME,
    icon: AiFillHome,
  },
  { name: "Notifications", path: NOTIFICATIONS, icon: AiFillBell },
 
];

export const menuPublicRoutes: Route[] = [
  {
    name: "Home",
    path: HOME,
    icon: AiFillHome,
  },
];
