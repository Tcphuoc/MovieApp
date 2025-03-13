import MainHeader from "@/components/share/main-header";
import classes from "./layout.module.css";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <div className={classes["background-signin"]}></div>
    <MainHeader isTransparent={true} isShowBar={false} />
    {children}
  </>
}
