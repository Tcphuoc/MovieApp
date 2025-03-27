"use client";

import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ItemProps {
  url?: string;
  name: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

type DropdownProps = {
  items: ItemProps[];
} & MenuProps;

export default function Dropdown({
  id,
  className,
  items,
  children,
}: DropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const route = useRouter();

  function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleNavigate(url: string) {
    setAnchorEl(null);
    route.push(url);
  }

  function handleClick({
    url,
    onClick,
  }: {
    url?: string;
    onClick?: () => void;
  }) {
    if (url) {
      return handleNavigate(url);
    } else if (onClick) {
      onClick();
    }
  }

  return (
    <div>
      <button id={id} className={className} onClick={handleOpen}>
        {children}
      </button>
      <Menu
        id={`${id}_menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            opacity: "50%",
          },
          "& .MuiMenuItem-root:hover": {
            backgroundColor: "var(--hover-color)",
          },
        }}
      >
        {items.map(({ name, icon, ...props }, i) => {
          return (
            <MenuItem
              className="w-50 text-white"
              key={i}
              onClick={() => handleClick(props)}
            >
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText>{name}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
