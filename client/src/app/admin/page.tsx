import CreateStock from "@/components/admin/create-stock";
import MintStock from "@/components/admin/mint-stock";
import React from "react";

const AdminPage = () => {
  return (
    <div className="w-full min-h-screen flex gap-10 px-10 items-center justify-center ">
      <CreateStock />
      <MintStock />
    </div>
  );
};

export default AdminPage;
