"use client";
import { useSocket } from "@/providers/socket-provider";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { socket, isConnected } = useSocket();
  const { symbol } = useParams();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (!isConnected) return;
    socket?.emit("subscribe", symbol);
    socket?.on("stock-data", (stock) => {
      console.log("🚀 ~ socket?.on ~ stock:", stock);
      setStock(stock);
    });

    return () => {
      socket?.emit("unsubscribe", symbol);
    };
  }, [isConnected]);
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-3">
      {JSON.stringify(stock)}
      <div className="flex gap-2">
        {stock &&
          Object.keys(stock).map((type) => {
            return (
              <button className="px-4 py-2 rounded-md bg-dark text-white">
                {type}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default page;
