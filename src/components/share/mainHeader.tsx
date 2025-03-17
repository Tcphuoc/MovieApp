"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { RootState } from "@/lib/store";
import logoImage from "@/app/icon.svg";
import Container from "../ui/container";
import { AuthState } from "@/lib/store/authSlice";
import Dropdown from "@/components/ui/dropdown"
import { Logout, Person, Notifications, Search } from "@mui/icons-material";
import { logout } from "@/lib/store/authSlice";

interface MainHeaderProps {
  isTransparent: boolean;
  isShowBar: boolean;
}

export default function MainHeader({ isTransparent, isShowBar }: MainHeaderProps) {
  const [isShow, setIsShow] = useState<boolean>(isShowBar);
  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, isLoading } = authState;

  const dispatch = useDispatch();

  const USER_INFO_ITEMS = [
    { url: '/user/profile', name: 'Account' },
    { name: 'Sign out', icon: <Logout sx={{color: "white"}} />, onClick: () => {dispatch(logout())} }
  ]

  useEffect(() => {
    if (!isShowBar) return;

    if (!isLoading) {
      setIsShow(isAuthenticated);
    }
  }, [isAuthenticated, isLoading, isShowBar])

  return <Container className={isTransparent ? 'bg-none' : 'bg-default' }>
    <header className={"flex justify-between"}>
      <div className="flex items-center">
        <Link className="flex items-center text-primary font-bold mr-10" href="/">
          <Image
            src={logoImage}
            alt="Logo image of application"
            className="w-12"
            priority
          />
          <h3>Movie App</h3>
        </Link>
        {isShow && (
          <ul>
            <li>
              <Link className={`hover:text-gray-200 mr-4`} href="/">Home</Link>
              <Link className={`hover:text-gray-200 mr-4`} href="/">TV Shows</Link>
              <Link className={`hover:text-gray-200 mr-4`} href="/">Movies</Link>
              <Link className={`hover:text-gray-200 mr-4`} href="/">New & Popular</Link>
              <Link className={`hover:text-gray-200 mr-4`} href="/">My List</Link>
              <Link className={`hover:text-gray-200 mr-4`} href="/">Browse by Languages</Link>
            </li>
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
  </Container>
}
