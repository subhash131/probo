"use client";
import React, { useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import InputField from "../input-field";

const CreateStock = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [loading, startTransition] = useTransition();

  const createNewStock = () => {
    startTransition(async () => {
      const res = await fetch(
        `http://localhost:8000/symbol/create/${stockSymbol}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      ).then(async (res) => await res.json());
      toast.info(res.message);
    });
  };
  return (
    <div className="w-60 h-fit py-4 px-4 rounded border  border-dashed border-dark flex flex-col gap-4">
      <InputField
        field={stockSymbol}
        name="Create a stock"
        setField={setStockSymbol}
      />
      <button
        className="w-fit text-xs active:scale-95 transition-transform px-2 py-1 bg-dark text-white rounded"
        onClick={createNewStock}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "Create"
        )}
      </button>
    </div>
  );
};

export default CreateStock;
