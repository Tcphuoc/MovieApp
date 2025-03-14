"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="modal"></div>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
