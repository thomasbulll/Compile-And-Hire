import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compile and Hire",
  description: "Driving the connection between computer science students and employers",
  icons: {
    icon: "/mini-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="relative">
          <NavBar />
          {children} 
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
 