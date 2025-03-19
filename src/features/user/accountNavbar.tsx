"use client";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Info, Lock, Logout, Settings } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/store/authSlice";
import { logout } from "@/lib/api/auth.api";
import { showAlertAction } from "@/store/alertSlice";

export default function AccountNavbar({ className }: { className: string }) {
  const dispatch = useDispatch();
  const pathName: string = usePathname();
  const route = useRouter();

  interface ItemProps {
    name: string;
    icon: React.ReactNode;
    path: string;
    action?: () => void;
  }

  async function logoutHandler() {
    try {
      await logout();
      dispatch(logoutAction());
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        dispatch(showAlertAction({ content: error.message, type: "error" }));
      }
    }
  }

  const items: ItemProps[] = [
    {
      name: "Update profile",
      icon: <Info sx={{ color: "white" }} />,
      path: "/user/profile",
    },
    {
      name: "Update password",
      icon: <Lock sx={{ color: "white" }} />,
      path: "/user/password",
    },
    {
      name: "Edit settings",
      icon: <Settings sx={{ color: "white" }} />,
      path: "/user/settings",
    },
    {
      name: "Logout",
      icon: <Logout sx={{ color: "white" }} />,
      path: "",
      action: logoutHandler,
    },
  ];

  function activeClass(path: string) {
    return path === pathName ? "var(--primary-color)" : "none";
  }

  function handleClick(action: () => void, path: string) {
    if (path.length > 0) {
      route.replace(path);
    } else {
      action();
    }
  }

  return (
    <div className={className}>
      <List>
        {items.map(({ name, icon, path, action }, i) => {
          return (
            <ListItemButton
              className="w-60"
              key={i}
              sx={{
                ":hover": { backgroundColor: "var(--hover-color)" },
                backgroundColor: activeClass(path),
              }}
              onClick={() => handleClick(action as () => void, path)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{name}</ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );
}
