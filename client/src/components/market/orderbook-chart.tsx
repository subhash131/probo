"use client";
import { RootState } from "@/state-manager/store";
import React from "react";
import { useSelector } from "react-redux";

const OrderbookChart = () => {
  const { orderbook } = useSelector((state: RootState) => state.orderbook);
  return (
    <div className="w-96 h-fit pb-6 border border-[#e3e3e3] rounded-lg overflow-hidden">
      <div className="w-full border-b h-10 px-4 flex items-center">
        <h3>ORDERBOOK</h3>
      </div>
      <div className="flex gap-2 size-full">
        <div className="size-full px-3">
          <div className="w-full h-14 flex items-center justify-between border-b">
            <h3 className="font-semibold uppercase">Price</h3>
            <div className="flex flex-col items-end">
              <p>QYT AT</p>
              <p className="text-blue-500">YES</p>
            </div>
          </div>
          {orderbook?.yes &&
            Object.keys(orderbook.yes).map((price) => {
              return (
                <div className="flex w-full h-10 border-b items-center justify-between">
                  <p>{price}</p>
                  <p>{orderbook.yes[price]?.total}</p>
                </div>
              );
            })}
        </div>
        <div className="size-full px-3">
          <div className="w-full h-14 flex items-center justify-between border-b">
            <h3 className="font-semibold uppercase">Price</h3>
            <div className="flex flex-col items-end">
              <p>QYT AT</p>
              <p className="text-red-500">NO</p>
            </div>
          </div>
          {orderbook?.no &&
            Object.keys(orderbook.no).map((price) => {
              return (
                <div className="flex w-full h-10 border-b items-center justify-between">
                  <p>{price}</p>
                  <p>{orderbook.no[price]?.total}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderbookChart;
