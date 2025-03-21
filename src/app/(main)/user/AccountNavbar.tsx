"use client";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Info, Lock, Logout } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/store/authSlice";
import { logout } from "@/lib/api/auth.api";
import errorHandler from "@/lib/utils/errorHandler";
import { accountNavigationItems } from "@/lib/constant/navigation";

export default function AccountNavbar({ className }: { className: string }) {
  const dispatch = useDispatch();
  const pathName: string = usePathname();
  const route = useRouter();

  async function logoutHandler() {
    try {
      await logout();
      dispatch(logoutAction());
    } catch (error: unknown) {
      errorHandler(error, dispatch);
    }
  }

  const iconMap = {
    info: <Info sx={{ color: "white" }} />,
    lock: <Lock sx={{ color: "white" }} />,
    logout: <Logout sx={{ color: "white" }} />,
  };

  function getIcon(iconType: string) {
    if (!(iconType in iconMap)) return;

    return iconMap[iconType as keyof typeof iconMap];
  }

  function activeBackground(path: string) {
    return path === pathName ? "var(--primary-color)" : "none";
  }

  function handleClick(path: string) {
    if (path.length > 0) {
      route.replace(path);
    } else {
      logoutHandler();
    }
  }

  return (
    <div className={className}>
      <List>
        {accountNavigationItems.map(({ label, icon, href }, i) => {
          return (
            <ListItemButton
              className="w-60"
              key={i}
              sx={{
                ":hover": { backgroundColor: "var(--hover-color)" },
                backgroundColor: activeBackground(href),
              }}
              onClick={() => handleClick(href)}
            >
              <ListItemIcon>{getIcon(icon as string)}</ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );
}
