"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import { RootState } from "@/lib/store";
import logoImage from "@/app/icon.svg";
import Container from "../ui/container";
import classes from "./main-header.module.css";
import searchIcon from "@/assets/icon/search.svg";
import notiIcon from "@/assets/icon/notification.svg";
import userIcon from "@/assets/icon/user.svg";
import { AuthState } from "@/lib/store/authSlice";
import Button from "../ui/button";

interface MainHeaderProps {
  isTransparent: boolean;
  isShowBar: boolean;
}

function UserInfo() {
  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);
  const userInfoRef = useRef<HTMLDivElement | null>(null);
  console.log(showUserInfo);

  function closeUserInfo() {
    setShowUserInfo(false)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userInfoRef.current && !userInfoRef.current.contains(event.target as Node)) {
        closeUserInfo();
      }
    }

    if (showUserInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserInfo]);

  return <>
    <li>
      <button className="w-8 ml-4 relative" onClick={() => setShowUserInfo((prev:boolean) => !prev)}>
        <Image src={userIcon} alt="notification icon" />
      </button>
    </li>
    {showUserInfo && (
      <div
        ref={userInfoRef}
        className="absolute w-50 z-10 bg-gray-100 px-4 py-2 translate-y-full right-12 rounded"
        tabIndex={0}
      >
        <ul>
          <li>
            <Link href="/user/update" className="text-black" onClick={closeUserInfo}>User info</Link>
          </li>
          <li>
            <Button className="text-black hover:cursor-pointer" type="button" onClick={closeUserInfo}>Sign out</Button>
          </li>
        </ul>
      </div>
    )}
  </>
}

export default function MainHeader({ isTransparent, isShowBar }: MainHeaderProps) {
  const [isShow, setIsShow] = useState<boolean>(isShowBar);
  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, isLoading } = authState;

  useEffect(() => {
    if (!isShowBar) return;

    if (!isLoading) {
      setIsShow(isAuthenticated);
    }
  }, [isAuthenticated, isLoading, isShowBar])

  return <Container className={isTransparent ? 'bg-none' : classes['default-background'] }>
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
        <>
          <ul className="flex items-center">
            <li>
              <button className="w-8 ml-4">
                <Image src={searchIcon} alt="search icon" />
              </button>
            </li>
            <li>
              <button className="w-8 ml-4">
                <Image src={notiIcon} alt="notification icon" />
              </button>
            </li>
            <UserInfo />
          </ul>

        </>
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
