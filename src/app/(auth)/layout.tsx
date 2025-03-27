import MainHeader from "@/components/share/MainHeader";
import classes from "./layout.module.css";
import CustomContainer from "@/components/ui/CustomContainer";
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
      <CustomContainer>
        <div className="bg-black w-130 py-15 px-20 mx-auto rounded-md">
          {children}
        </div>
      </CustomContainer>
    </>
  );
}
