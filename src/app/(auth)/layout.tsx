import MainHeader from "@/components/share/MainHeader";
import classes from "./layout.module.css";
import Container from "@/components/ui/Container";
import AuthAlert from "./alert";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className={classes["background-signin"]}></div>
      <AuthAlert />
      <MainHeader isTransparent={true} isShowBar={false} />
      <Container>{children}</Container>
    </>
  );
}
