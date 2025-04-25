"use client";

import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { useAssetStore } from "@/store";
import { AssetShow } from "@/components/AssetShow";
import { Button, TableCell, TableRow } from "flowbite-react";
import { Asset } from "@/model";

type AssetRowProps = {
  asset: Asset;
  walletId: string;
};

export function TableAssetRow({ asset, walletId }: AssetRowProps) {
  const assetFound = useAssetStore(
    useShallow((state) => state.assets.find((a) => a.symbol === asset.symbol))
  );

  const asset_ = assetFound || asset;

  return (
    <TableRow>
      <TableCell>
        <AssetShow asset={asset_} />
      </TableCell>
      <TableCell>R$ {asset_.price}</TableCell>
      <TableCell>
        <Button
          className="w-fit"
          color="light"
          as={Link}
          href={`/assets/${asset.symbol}?wallet_id=${walletId}`}
        >
          Comprar/vender
        </Button>
      </TableCell>
    </TableRow>
  );
}
