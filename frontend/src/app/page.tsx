import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Wallet } from "@/model";
import Image from "next/image";

export async function getMyWallet(walletId: string): Promise<Wallet> {
  const response = await fetch(`http://localhost:3000/wallets/${walletId}`);
  const data = await response.json();
  return data;
}

export default async function MyWallet({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;
  const wallet = await getMyWallet(wallet_id);

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minha Carteira</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Comprar / Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallet.assets.map((walletAsset, key) => (
              <TableRow key={key}>
                <TableCell>
                  <div className="flex space-x-1">
                    <div className="content-center">
                      <Image
                        src={walletAsset.asset.image_url}
                        alt={walletAsset.asset.symbol}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex flex-col text-sm">
                      <span>{walletAsset.asset.name}</span>
                      <span>{walletAsset.asset.symbol}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>R$ {walletAsset.asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
                <TableCell>
                  <Button color="light" size="sm">
                    Comprar/Vender
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
