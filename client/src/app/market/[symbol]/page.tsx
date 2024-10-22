"use client";
import Modal from "@/components/market/modal";
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
      quantity: 5,
      price: 5,
      stockType,
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
                onClick={() =>
                  handleClick({ stockType: stockType.toLowerCase() })
                }
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
