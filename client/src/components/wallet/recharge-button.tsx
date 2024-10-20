"use client";
import { setBalance } from "@/state-manager/features/wallet-balance";
import { RootState } from "@/state-manager/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const RechargeButton = ({ amount }: { amount: number | undefined }) => {
  const { username } = useSelector((state: RootState) => state.username);
  const dispatch = useDispatch();
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

    if (res.status == 200) {
      const data = await fetch(
        `http://localhost:8000/balance/inr/${username}`
      ).then(async (res) => await res.json());

      if (data && data.balance) {
        dispatch(setBalance(data.balance));
      }
    }

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
