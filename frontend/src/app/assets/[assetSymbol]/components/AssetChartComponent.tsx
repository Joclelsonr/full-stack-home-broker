"use client";

import { useRef } from "react";
import { Asset } from "@/model";

import { AssetShow } from "@/components/AssetShow";
import { ChartComponent, ChartComponentRef } from "@/components/ChartComponent";

export function AssetChartComponent({ asset }: { asset: Asset }) {
  const chartRef = useRef<ChartComponentRef>(null);
  //websocket

  return <ChartComponent ref={chartRef} header={<AssetShow asset={asset} />} />;
}
