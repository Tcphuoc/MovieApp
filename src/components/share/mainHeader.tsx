"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { RootState } from "@/store";
import logoImage from "@/app/icon.svg";
import CustomContainer from "../ui/CustomContainer";
import { AuthState } from "@/store/authSlice";
import Dropdown from "@/components/ui/Dropdown";
import { Logout, Person, Notifications, Search } from "@mui/icons-material";
import { logoutAction } from "@/store/authSlice";
import { logout } from "@/lib/api/auth.api";
import errorHandler from "@/lib/utils/errorHandler";
import { mainNavigationItems } from "@/lib/constant/navigation";

interface MainHeaderProps {
  isTransparent: boolean;
  isShowBar: boolean;
}

export default function MainHeader({
  isTransparent,
  isShowBar,
}: MainHeaderProps) {
  const [isShow, setIsShow] = useState<boolean>(isShowBar);
  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, isLoading } = authState;

  const dispatch = useDispatch();

  async function logoutHandler() {
    try {
      await logout();
      dispatch(logoutAction());
    } catch (error: unknown) {
      errorHandler(error, dispatch);
    }
  }

  const USER_INFO_ITEMS = [
    { url: "/user/profile", name: "Account" },
    {
      name: "Sign out",
      icon: <Logout sx={{ color: "white" }} />,
      onClick: logoutHandler,
    },
  ];

  useEffect(() => {
    if (!isShowBar) return;

    if (!isLoading) {
      setIsShow(isAuthenticated);
    }
  }, [isAuthenticated, isLoading, isShowBar]);

  return (
    <CustomContainer className={isTransparent ? "bg-none" : "bg-default"}>
      <header className={"flex justify-between"}>
        <div className="flex items-center">
          <Link
            className="flex items-center text-primary font-bold mr-10"
            href="/"
          >
            <Image
              src={logoImage}
              alt="Logo image of application"
              className="w-12"
              priority
            />
            <h3>Movie App</h3>
          </Link>
          {isShow && (
            <ul className="flex">
              {mainNavigationItems.map(({ label, href }, index) => {
                return (
                  <li key={index}>
                    <Link
                      className={`hover:text-gray-200 mr-4`}
                      href={href as string}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {isShow ? (
          <ul className="flex items-center">
            <li>
              <button className="w-8 ml-4">
                <Search fontSize="large" />
              </button>
            </li>
            <li>
              <button className="w-8 ml-4">
                <Notifications fontSize="large" />
              </button>
            </li>
            <Dropdown
              id="user_info"
              className="w-10 ml-4"
              items={USER_INFO_ITEMS}
              open={true}
            >
              <Person fontSize="large" />
            </Dropdown>
          </ul>
        ) : (
          <ul className="flex items-center">
            <li>
              <button className="hover:text-gray-200 ml-4">
                <Link href="/signin">Sign in / Sign up</Link>
              </button>
            </li>
          </ul>
        )}
      </header>
    </CustomContainer>
  );
}
