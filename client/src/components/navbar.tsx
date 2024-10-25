"use client";
import React from "react";
import WalletBalance from "./wallet-balance";
import Image from "next/image";
import Username from "./username";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TradeOnlineButton from "./buttons/trade-online-button";
import DownloadAppButton from "./buttons/download-app-button";

const innerLinks = [
  {
    id: "Wallet-123",
    name: "Wallet",
    path: "/wallet",
  },
  {
    id: "market-123",
    name: "Market",
    path: "/market",
  },
  {
    id: "Admin-123",
    name: "Admin",
    path: "/admin",
  },
];
const externalLinks = [
  {
    id: "trading-123",
    name: "Trading",
    path: "/market",
    disabled: false,
  },
  {
    id: "team-11-123",
    name: "Team 11",
    path: "#",
    disabled: true,
  },
  {
    id: "read-123",
    name: "Read",
    path: "#",
    disabled: true,
  },
  {
    id: "care-123",
    name: "Cares",
    path: "#",
    disabled: true,
  },
  {
    id: "Careers-123",
    name: "Careers",
    path: "#",
    disabled: true,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full h-16 flex items-center justify-between px-10 fixed top-0 z-50 bg-background border-b">
      <div className="size-full flex gap-4 items-center">
        <Link href="/" className="w-fit h-fit" id="logo">
          <Image
            src="/logo.png"
            alt="logo"
            width={1}
            height={1}
            className="w-fit h-14"
          />
        </Link>
        {pathname === "/" && (
          <>
            {externalLinks.map(({ disabled, id, name, path }) => {
              return (
                <Link
                  href={path}
                  className={`px-3 py-1 hover:bg-gray-200 rounded-md text-sm ${
                    disabled ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  id={id}
                >
                  {name}
                </Link>
              );
            })}
          </>
        )}
      </div>
      {pathname !== "/" && (
        <div className="w-full flex gap-2 items-center justify-center">
          {innerLinks.map(({ id, name, path }) => {
            return (
              <Link
                href={path}
                className="px-3 py-1 hover:bg-gray-200 rounded-md"
                id={id}
              >
                {name}
              </Link>
            );
          })}
        </div>
      )}
      <div className="w-full flex gap-3 items-center justify-end text-center">
        {pathname !== "/" ? (
          <>
            <Username />
            <WalletBalance />
          </>
        ) : (
          <>
            <p className="text-end text-xs">
              For 18 years and <br /> above only
            </p>
            <DownloadAppButton />
            <TradeOnlineButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
