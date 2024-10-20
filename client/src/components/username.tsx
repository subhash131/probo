"use client";
import { setUsername } from "@/state-manager/features/username";
import { RootState } from "@/state-manager/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Username = () => {
  const { username } = useSelector((state: RootState) => state.username);
  const dispatch = useDispatch();
  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };
  return (
    <input
      className="bg-transparent w-24 outline-none"
      autoFocus
      placeholder="Username"
      onChange={updateUsername}
      value={username}
    />
  );
};

export default Username;
