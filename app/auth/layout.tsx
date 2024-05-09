import type { Metadata } from "next";
import ".././globals.css";
import TopNav from "@/components/madeups/top-nav";

export const metadata: Metadata = {
  title: "Requ App",
  description: "Submit your requests here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNav />
      {children}
    </>
  );
}
