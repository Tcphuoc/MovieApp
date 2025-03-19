import MainHeader from "@/components/share/MainHeader";
import classes from "./layout.module.css";
import Container from "@/components/ui/Container";
import CustomAlert from "@/components/ui/CustomAlert";
import AuthLoading from "./loading";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className={classes["background-signin"]}></div>
      <CustomAlert />
      <AuthLoading />
      <MainHeader isTransparent={true} isShowBar={false} />
      <Container>{children}</Container>
    </>
  );
}
