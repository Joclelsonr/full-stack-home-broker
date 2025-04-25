"use client";

import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { Button, TableCell, TableRow } from "flowbite-react";
import { AssetShow } from "../components/AssetShow";
import { useAssetStore } from "../store";
import { WalletAsset } from "@/model";

type WalletAssetRowProps = {
  walletAsset: WalletAsset;
  walletId: string;
};

export function TableWalletAssetRow({
  walletAsset,
  walletId,
}: WalletAssetRowProps) {
  const assetFound = useAssetStore(
    useShallow((state) =>
      state.assets.find((a) => a.symbol === walletAsset.asset.symbol)
    )
  );

  const asset = assetFound || walletAsset.asset;

  return (
    <TableRow>
      <TableCell>
        <AssetShow asset={asset} />
      </TableCell>
      <TableCell>R$ {asset.price}</TableCell>
      <TableCell>{walletAsset.shares}</TableCell>
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
