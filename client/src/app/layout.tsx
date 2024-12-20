import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SocketProvider from "@/providers/socket-provider";
import StateProvider from "@/providers/state-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Probo",
  description: "Project by subhash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StateProvider>
        <SocketProvider>
          <body
            className={`${poppins.className} bg-background w-screen h-full overflow-x-hidden`}
          >
            <Toaster />
            <Navbar />
            {children}
          </body>
        </SocketProvider>
      </StateProvider>
    </html>
  );
}
