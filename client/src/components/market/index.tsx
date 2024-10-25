"use client";
import { useSocket } from "@/providers/socket-provider";
import { setMarket } from "@/state-manager/features/market";
import { RootState } from "@/state-manager/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { PiPlus } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const Market = () => {
  const { socket, isConnected } = useSocket();
  const { market } = useSelector((state: RootState) => state.market);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected) return;
    socket?.emit("fetch-market");
    socket?.on("market-response", (market) => {
      dispatch(setMarket(market));
    });
  }, [isConnected]);

  return (
    <div className="no-scrollbar size-full overflow-x-scroll flex flex-wrap items-center justify-center gap-2">
      {Object.keys(market).length === 0 && (
        <div className="py-1 px-2 text-xs flex items-center gap-2">
          <p>No active stocks found</p>
          <Link
            href="/admin"
            className="bg-dark text-white px-4 py-2 rounded active:scale-95 transition-all flex gap-1 items-center"
          >
            <PiPlus /> Create one
          </Link>
        </div>
      )}
      {Object.keys(market).map((key) => {
        return (
          <Link
            href={`/market/${key}`}
            className="px-3 py-2 bg-white rounded-md shadow-lg cursor-pointer"
            key={key}
          >
            {key}
          </Link>
        );
      })}
    </div>
  );
};

export default Market;
