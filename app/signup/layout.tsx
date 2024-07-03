import type { Metadata } from "next";
import Image from "next/image";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Requ | dashboard",
  description: "Requ is a platform for educators to make Requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-auto h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
