"use client";
import { useSocket } from "@/providers/socket-provider";
import { setBalance } from "@/state-manager/features/wallet-balance";
import { RootState } from "@/state-manager/store";
import React, { useEffect } from "react";
import { CiWallet } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

const WalletBalance = () => {
  const { socket } = useSocket();
  const { balance } = useSelector((state: RootState) => state.walletBalance);
  const { username } = useSelector((state: RootState) => state.username);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("wallet", socket?.active);
    socket?.emit("fetch-balance", username);
    socket?.on("balance-response", (data) => {
      if (data) {
        dispatch(setBalance(data.balance));
      } else {
        dispatch(setBalance(0));
      }
    });
  }, [username]);

  return (
    <div className="flex gap-2 items-center justify-center border px-4 py-2 rounded-md border-dark">
      <CiWallet size={28} />
      {`₹${balance}`}
    </div>
  );
};

export default WalletBalance;
