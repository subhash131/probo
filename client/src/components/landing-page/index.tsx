"use client";
import React from "react";
import { Work_Sans } from "next/font/google";
import Image from "next/image";
import TradeOnline from "../buttons/trade-online-button";
import DownloadAppButton from "../buttons/download-app-button";

const work = Work_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen pt-16 flex items-center justify-center">
      <div className="size-full flex items-start justify-center flex-col gap-10">
        <div className="flex flex-col gap-10">
          <h1 className={`${work.className} text-7xl text-[#262626] `}>
            Invest in your <br />{" "}
            <span className="text-5xl">point of view</span>
          </h1>
          <h3 className="text-[#545454] text-xl">
            Sports, Entertainment, Economy or Finance.
          </h3>
        </div>
        <div className="w-full items-center flex gap-4">
          <DownloadAppButton />
          <TradeOnline />
        </div>
        <div className="flex gap-2 items-center text-xs  -mt-6">
          <input
            type="checkbox"
            className="accent-dark"
            checked
            onChange={() => {}}
          />{" "}
          <span>For 18 years and above only</span>
        </div>
      </div>
      <div className="size-full">
        <Image
          src="/probo-hero.avif"
          width={1}
          height={1}
          alt="hero"
          className="w-[39rem] object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default LandingPage;
