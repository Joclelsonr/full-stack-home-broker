"use client";

import { useEffect, useRef } from "react";
import { Asset } from "@/model";

import { AssetShow } from "@/components/AssetShow";
import { ChartComponent, ChartComponentRef } from "@/components/ChartComponent";
import { Time } from "lightweight-charts";
import { socket } from "@/socket.io";

export function AssetChartComponent({
  asset,
  data,
}: {
  asset: Asset;
  data?: { time: Time; value: number }[];
}) {
  const chartRef = useRef<ChartComponentRef>(null);
  const symbol = asset.symbol;

  useEffect(() => {
    socket.connect();
    socket.emit("joinAsset", { symbol });
    socket.on("assets/daily-created", (assetDaily) => {
      console.log(assetDaily);
      chartRef.current?.update({
        time: (Date.parse(assetDaily.date) / 1000) as Time,
        value: assetDaily.price,
      });
    });
  }, [symbol]);

  return (
    <ChartComponent
      ref={chartRef}
      header={<AssetShow asset={asset} />}
      data={data}
    />
  );
}
