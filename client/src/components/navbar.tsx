import React from "react";
import WalletBalance from "./wallet-balance";
import Image from "next/image";
import Username from "./username";

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
      <div className="flex gap-3 items-center justify-center text-center">
        <Username />
        <WalletBalance />
      </div>
    </div>
  );
};

export default Navbar;
