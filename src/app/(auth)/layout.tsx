import MainHeader from "@/components/share/mainHeader";
import classes from "./layout.module.css";
import Container from "@/components/ui/container";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <div className={classes["background-signin"]}></div>
    <div id="auth_alert"></div>
    <MainHeader isTransparent={true} isShowBar={false} />
    <Container>
      {children}
    </Container>
  </>
}
