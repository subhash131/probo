import RechargeAccount from "@/components/wallet/recharge";
import RegisterUser from "@/components/wallet/register-user";
import React from "react";

const FundWalletPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-4">
      <RechargeAccount />
      <RegisterUser />
    </div>
  );
};

export default FundWalletPage;
