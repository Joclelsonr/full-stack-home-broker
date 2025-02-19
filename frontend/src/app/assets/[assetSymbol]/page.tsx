import { OrderType } from "@/model";
import { Card, Tabs } from "flowbite-react";
import { AssetShow } from "@/components/AssetShow";
import { OrderForm } from "@/components/OrderForm";
import { TabsItem } from "@/components/Tabs";
import { WalletList } from "@/components/WalletList";
import { AssetChartComponent } from "./components/AssetChartComponent";

import { getAssetBySymbol, getMyWallet } from "@/queries";

type AssetDashboardProps = {
  params: Promise<{ assetSymbol: string }>;
  searchParams: Promise<{ wallet_id: string }>;
};

export default async function AssetDashboard({
  params,
  searchParams,
}: AssetDashboardProps) {
  const { assetSymbol } = await params;
  const { wallet_id } = await searchParams;
  if (!wallet_id) {
    return <WalletList />;
  }

  const wallet = await getMyWallet(wallet_id);
  if (!wallet) {
    return <WalletList />;
  }

  const asset = await getAssetBySymbol(assetSymbol);

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2">
        <AssetShow asset={asset} />
        <div className="ml-2 font-bold text-2xl">R$ {asset.price}</div>
        <div className="grid grid-cols-5 flex-grow gap-2">
          <div className="col-span-2">
            <Card>
              <Tabs>
                <TabsItem
                  active
                  title={<div className="text-blue-700">Comprar</div>}
                >
                  <OrderForm
                    asset={asset}
                    walletId={wallet_id}
                    type={OrderType.BUY}
                  />
                </TabsItem>
                <TabsItem title={<div className="text-red-500">Vender</div>}>
                  <OrderForm
                    asset={asset}
                    walletId={wallet_id}
                    type={OrderType.SELL}
                  />
                </TabsItem>
              </Tabs>
            </Card>
          </div>
          <div className="col-span-3 flex flex-grow">
            <AssetChartComponent asset={asset} />
          </div>
        </div>
      </div>
    </div>
  );
}
