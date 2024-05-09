import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ".././globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TopNav from "@/components/madeups/top-nav";

const inter = Inter({ subsets: ["latin"] });

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
    // <html lang="en">
    //   <body className={inter.className}>
    //     {" "}
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TopNav />
      {children}
    </ThemeProvider>
    //   </body>
    // </html>
  );
}
