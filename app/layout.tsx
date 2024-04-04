import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Logout from "@/components/logout";
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: "Compile and Hire",
  description: "Driving the connection between computer science students and employers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="relative">
        <nav>
          {!!session &&
            <Logout/>
          }
        </nav>
        <NavBar />
        {children} 
        <Footer />
      </body>
    </html>
  );
}
 