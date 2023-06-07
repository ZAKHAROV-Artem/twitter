import { IconType } from "react-icons";
import {
  AiFillHome,
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
 
];

export const menuPublicRoutes: Route[] = [
  {
    name: "Home",
    path: HOME,
    icon: AiFillHome,
  },
];
