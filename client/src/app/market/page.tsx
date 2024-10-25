import DownloadAppButton from "@/components/buttons/download-app-button";
import LineChart from "@/components/charts/line-chart";
import Market from "@/components/market";
import Image from "next/image";
import React from "react";
import { FaExchangeAlt } from "react-icons/fa";

const MarketPage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden pt-16">
      <div className="w-full h-16 flex">
        <Market />
      </div>
      <div className="size-full px-10 py-2 flex gap-6">
        <div className="size-full flex flex-col gap-10 ">
          <h2 className="text-xl font-semibold">Top Stories</h2>
          <div className=" w-full h-fit bg-white rounded-xl flex p-6 border gap-6">
            <div className="size-full flex flex-col gap-2">
              <h3 className="text-2xl font-semibold">
                Tax Refund for states to be increased by the 16th Finance
                Commission?
              </h3>
              <p className="text-sm font-semibold text-[#565656]">
                The 15th Finance Commission had recommended 41% of the tax funds
                collected by states to be paid to the sates
              </p>
              <p className="text-sm text-[#565656]">
                The finance ministers of these participating states agreed with
                Vijayan that states need to receive more funds from the Centre.
                Vijayan said that, as per Article 270.
              </p>
              <div className="w-full h-20 flex items-center justify-between">
                <div className="w-fit">
                  <p className="font-semibold">512</p>
                  <p className="text-xs">Traders</p>
                </div>
                <div className="w-fit flex items-center gap-4">
                  <button className="cursor-not-allowed font-semibold px-10 py-2 bg-[rgba(96,165,250,0.1)] text-blue-500 rounded text-sm">
                    Yes ₹ 8.0
                  </button>
                  <button className="cursor-not-allowed font-semibold px-10 py-2 bg-[rgba(239,68,68,0.1)] text-red-500 rounded text-sm">
                    No ₹ 2.0
                  </button>
                </div>
              </div>
            </div>
            <div className="size-full">
              <div className="w-full flex justify-between h-fit">
                <div>
                  <p className="font-semibold text-blue-500">80%</p>
                  <p className="uppercase text-[0.6rem] font-semibold text-[#565656]">
                    Probability of yes
                  </p>
                </div>
                <div className="px-4 items-center gap-2 text-red-400 rounded-xl border text-xs font-semibold flex">
                  <FaExchangeAlt />
                  No
                </div>
              </div>
              <div className="size-full">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
        <div className="w-96 h-full shrink-0 px-4">
          <div className="w-full h-fit rounded-xl relative bg-[#EDEDED] flex gap-2 overflow-hidden">
            <div className="size-full absolute z-0">
              <Image
                src="/download-bg.png"
                alt="bg"
                width={1}
                height={1}
                className="size-full object-fill"
              />
            </div>
            <div className="size-full z-10 p-5 gap-4 flex flex-col">
              <p className="text-xl font-semibold uppercase">
                Download app for better & fast experience
              </p>
              <DownloadAppButton bg="bg-dark text-white w-fit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
