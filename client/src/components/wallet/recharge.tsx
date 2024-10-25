"use client";

import React, { useState } from "react";
import RechargeButton from "./recharge-button";
import InputField from "../input-field";

const RechargeAccount = () => {
  const [amount, setAmount] = useState("50000");
  return (
    <div className="w-60 h-fit py-4 px-4 rounded border  border-dashed border-dark flex flex-col gap-4">
      <InputField
        field={amount}
        name="Recharge your Account"
        setField={setAmount}
      />

      <RechargeButton amount={amount} />
    </div>
  );
};

export default RechargeAccount;
