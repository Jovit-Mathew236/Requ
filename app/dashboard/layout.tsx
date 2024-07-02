import NavBar from "@/components/madeups/navbar";
import UpdateZustand from "@/lib/updateZuztand";
import type { Metadata } from "next";
import Image from "next/image";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edapt | dashboard",
  description:
    "Edapt is a platform for educators to share and discover resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F3F5F9] min-h-screen dark:bg-[#2c3a4d]">
      <NavBar />
      <div className="p-4 sm:ml-64">
        <UpdateZustand />
        <div className="px-1 py-4 md:p-4  mt-14">{children}</div>
      </div>
    </div>
  );
}
