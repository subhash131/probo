"use client";
import React, { useState } from "react";
import RegisterButton from "../register";
import InputField from "../input-field";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  return (
    <div className="w-60 h-fit py-4 px-4 rounded border  border-dashed border-dark flex flex-col gap-4">
      <InputField
        field={username}
        setField={setUsername}
        name="Register a User"
      />
      <RegisterButton username={username} />
    </div>
  );
};

export default RegisterUser;
