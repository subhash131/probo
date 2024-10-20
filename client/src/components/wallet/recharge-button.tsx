"use client";
import { RootState } from "@/state-manager/store";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const RechargeButton = ({ amount }: { amount: number | undefined }) => {
  const { username } = useSelector((state: RootState) => state.username);
  const recharge = async () => {
    if (!username) {
      toast.error("Username not found!");
      return;
    }
    if (!amount) {
      toast.error("Enter a valid amount!");
      return;
    }
    const body = {
      userId: username,
      amount,
    };
    const res = await fetch("http://localhost:8000/onramp/inr", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    toast.info(data.msg);
  };
  return (
    <button
      className="bg-dark rounded-lg active:scale-95 transition-transform px-4 py-2 text-white"
      onClick={recharge}
    >
      recharge
    </button>
  );
};

export default RechargeButton;
