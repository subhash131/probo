"use client";
import Modal from "@/components/market/modal";
import OrderbookChart from "@/components/market/orderbook-chart";
import { useSocket } from "@/providers/socket-provider";
import { RootState } from "@/state-manager/store";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const page = () => {
  const { socket, isConnected } = useSocket();
  const { symbol } = useParams();
  const { username } = useSelector((state: RootState) => state.username);
  const { stock } = useSelector((state: RootState) => state.stock);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    socket?.emit("subscribe", symbol);

    return () => {
      socket?.emit("unsubscribe", symbol);
    };
  }, [isConnected]);

  const handleClick = async ({ stockType }: { stockType: string }) => {
    if (!username) {
      toast.error("Username not found");
      return;
    }

    const body = {
      userId: username,
      stockSymbol: symbol,
      quantity: 1,
      price: stock[symbol as string][stockType],
      stockType: stockType.toLowerCase(),
    };

    const res = await fetch("http://localhost:8000/order/buy", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => await res.json());
    socket?.emit("trade", symbol);
    toast.info(res.message);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-3 relative">
      <Modal open={modalOpen} setModalOpen={setModalOpen} />
      <OrderbookChart />
      <div className="flex gap-2">
        {typeof symbol === "string" &&
          stock[symbol] &&
          Object.keys(stock[symbol]).map((stockType) => {
            return (
              <button
                className={`w-48 py-2 rounded-md active:scale-95 disabled:scale-100 transition-transform text-sm font-semibold ${
                  stockType === "No"
                    ? "bg-[rgba(248,113,113,0.2)] text-red-500"
                    : "bg-[rgba(96,165,250,0.2)] text-blue-500"
                }`}
                onClick={() => handleClick({ stockType })}
                key={symbol + stockType}
                disabled={stock[symbol][stockType].toString() === "NaN"}
              >
                {stock[symbol][stockType].toString() === "NaN"
                  ? `0 ${stockType}`
                  : `₹${stock[symbol][stockType]} ${stockType}`}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default page;
