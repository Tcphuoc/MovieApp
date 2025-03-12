import Link from "next/link";
import logoImage from "@/app/icon.svg";
import Image from "next/image";
// import Button from "./ui/button";
import Container from "./ui/container";

import classes from "./main-header.module.css";
import searchIcon from "@/assets/icon/search.svg";
import notiIcon from "@/assets/icon/notification.svg";
import userIcon from "@/assets/icon/user.svg";

export default function MainHeader() {
  return <Container className={classes.header}>
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
      </div>
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
        <li>
          <button className="w-8 ml-4">
            <Image src={userIcon} alt="notification icon" />
          </button>
        </li>
      </ul>
    </header>
  </Container>
}
