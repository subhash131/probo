"use client";
import { RootState } from "@/state-manager/store";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const RegisterButton = () => {
  const { username } = useSelector((state: RootState) => state.username);
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
      className="bg-dark rounded-lg active:scale-95 transition-transform px-4 py-2 text-white"
      onClick={register}
    >
      Register
    </button>
  );
};

export default RegisterButton;
