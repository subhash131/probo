"use client";
import React from "react";
import { toast } from "sonner";

const RegisterButton = ({ username }: { username: string }) => {
  const register = async () => {
    if (!username) {
      toast.error("Username not found!");
      return;
    }
    const res = await fetch(`http://localhost:8000/user/create/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    toast.info(data.message);
  };
  return (
    <button
      className="bg-dark w-fit rounded active:scale-95 transition-transform text-xs px-4 py-2 text-white"
      onClick={register}
    >
      Register
    </button>
  );
};

export default RegisterButton;
