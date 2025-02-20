export type OrderType = 'BUY' | 'SELL';

export class CreateOrderDto {
  walletId: string;
  assetId: string;
  shares: number;
  price: number;
  type: OrderType;
}
