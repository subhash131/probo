"use client";

import React, { useState } from "react";
import RechargeButton from "./recharge-button";
import RegisterButton from "../register";

const AddFunds = () => {
  const [amount, setAmount] = useState<number>(0);
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4">
      <input
        className="px-3 py-2 outline-none border rounded-lg"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <RechargeButton amount={amount} />
      <RegisterButton />
    </div>
  );
};

export default AddFunds;
