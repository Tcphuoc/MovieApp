import type { Metadata } from "next";
import MainHeader from "@/components/share/mainHeader";
import AuthGuard from "@/components/share/authGuard";
import Container from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Home - Movie App",
  description: "Generated by create next app",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div id="main_alert"></div>
      <MainHeader isTransparent={false} isShowBar={true} />
      <Container>{children}</Container>
    </AuthGuard>
  );
}
