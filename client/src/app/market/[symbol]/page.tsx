"use client";
import Modal from "@/components/market/modal";
import { useSocket } from "@/providers/socket-provider";
import { RootState } from "@/state-manager/store";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

type Stock = {
  [symbol: string]: {
    [type: string]: number;
  };
};

const page = () => {
  const { socket, isConnected } = useSocket();
  const { symbol } = useParams();
  const [stock, setStock] = useState<Stock>({});
  const { username } = useSelector((state: RootState) => state.username);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-3 relative">
      <Modal open={modalOpen} setModalOpen={setModalOpen} />
      {JSON.stringify(stock)}
      <div className="flex gap-2">
        {typeof symbol === "string" &&
          stock[symbol] &&
          Object.keys(stock[symbol]).map((stockType) => {
            return (
              <button
                className={`w-52 py-2 rounded-md bg-dark text-white active:scale-95 transition-transform text-sm ${
                  stockType === "No"
                    ? "bg-[rgba(248,113,113,0.2)] text-red-500"
                    : "bg-[rgba(96,165,250,0.2)] text-blue-500"
                }`}
                onClick={handleClick}
              >
                {`₹${stock[symbol][stockType]} ${stockType}`}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default page;
