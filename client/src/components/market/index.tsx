"use client";
import { useSocket } from "@/providers/socket-provider";
import { setMarket } from "@/state-manager/features/market";
import { RootState } from "@/state-manager/store";
import Link from "next/link";
import React, { useEffect } from "react";
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
    <div className="w-screen h-screen flex flex-wrap items-center justify-center gap-2">
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
