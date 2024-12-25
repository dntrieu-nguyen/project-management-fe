import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "antd/dist/reset.css";
import StoreProvider from "@/components/organisms/StoreProvider";
import AuthContext from "@/hoc/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Project Management",
  description: "Project Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AntdRegistry>
          <StoreProvider>
            <AuthContext>{children}</AuthContext>
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
