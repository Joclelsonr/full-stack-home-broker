import Image from "next/image";
import { Asset } from "@/model";

export function AssetShow({ asset }: { asset: Asset }) {
  return (
    <div className="flex space-x-1">
      <div className="content-center">
        <Image
          src={asset.image_url}
          alt={asset.symbol}
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col text-sm">
        <span>{asset.name}</span>
        <span>{asset.symbol}</span>
      </div>
    </div>
  );
}
