import React from "react";
import WalletBalance from "./wallet-balance";
import Image from "next/image";
import Username from "./username";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-10 fixed top-0">
      <Image
        src="/logo.png"
        alt="logo"
        width={1}
        height={1}
        className="w-fit h-14"
      />
      <div className="w-full flex gap-2 items-center justify-center">
        <Link href="/wallet" className="px-3 py-1 hover:bg-gray-200 rounded-md">
          Wallet
        </Link>
        <Link href="/market" className="px-3 py-1 hover:bg-gray-200 rounded-md">
          Market
        </Link>
      </div>
      <div className="flex gap-3 items-center justify-center text-center">
        <Username />
        <WalletBalance />
      </div>
    </div>
  );
};

export default Navbar;
