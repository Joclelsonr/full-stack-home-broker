export type OrderType = 'BUY' | 'SELL';

export class CreateOrderDto {
  walletId: string;
  asssetId: string;
  shares: number;
  price: string;
  type: OrderType;
}
