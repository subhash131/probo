import Link from "next/link";
import React from "react";

const TradeOnlineButton = () => {
  return (
    <Link
      href="/market"
      className="rounded border bg-[#262626] text-white px-8 py-2 text-sm font-semibold text-nowrap"
    >
      Trade Online
    </Link>
  );
};

export default TradeOnlineButton;
