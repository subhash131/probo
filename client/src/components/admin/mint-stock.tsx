"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import InputField from "../input-field";
import { toast } from "sonner";

const MintStock = () => {
  const [loading, startTransition] = useTransition();
  const [stockSymbol, setStockSymbol] = useState("");
  const [userId, setUserId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const mintStock = () => {
    const stockData = {
      stockSymbol,
      userId,
      quantity,
      price,
    };
    startTransition(async () => {
      const res = await fetch("http://localhost:8000/trade/mint", {
        method: "POST",
        body: JSON.stringify(stockData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => await res.json());
      toast.info(res.message);
    });
  };
  return (
    <div className="w-60 h-fit py-4 px-4 rounded border  border-dashed border-dark flex flex-col gap-1">
      <h3 className="text-base">Mint a Stock</h3>
      <InputField
        field={stockSymbol}
        setField={setStockSymbol}
        name="Stock Symbol"
      />
      <InputField field={userId} setField={setUserId} name="Username" />
      <InputField field={quantity} setField={setQuantity} name="Quantity" />
      <InputField field={price} setField={setPrice} name="Price" />
      <button
        className="w-fit text-xs active:scale-95 transition-transform px-2 py-1 bg-dark text-white rounded"
        onClick={mintStock}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "Mint"
        )}
      </button>
    </div>
  );
};

export default MintStock;
