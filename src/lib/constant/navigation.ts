import { NavigationItemProps } from "@/types/navigation";

const mainNavigationItems: NavigationItemProps = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "TV Shows",
    href: "/",
  },
  {
    label: "Movies",
    href: "/",
  },
  {
    label: "New & Popular",
    href: "/",
  },
  {
    label: "My List",
    href: "/",
  },
  {
    label: "Browse by Languages",
    href: "/",
  },
];

const accountNavigationItems: NavigationItemProps = [
  {
    label: "Update profile",
    href: "/user/profile",
    icon: "info",
  },
  {
    label: "Update password",
    href: "/user/password",
    icon: "lock",
  },
  {
    label: "Logout",
    href: "",
    icon: "logout",
  },
];

export { mainNavigationItems, accountNavigationItems };
