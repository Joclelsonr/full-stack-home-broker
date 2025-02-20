import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OrdersService } from './orders.service';
import { OrderType } from './dto/create-order.dto';

type Order = {
  asssetId: string;
  walletId: string;
  type: OrderType;
  shares: number;
  price: number;
};

@WebSocketGateway({ cors: true })
export class OrdersGateway {
  constructor(private ordersService: OrdersService) {}

  @SubscribeMessage('orders/create')
  async handleMessage(client: any, payload: Order) {
    const order = await this.ordersService.create({
      assetId: payload.asssetId,
      walletId: payload.walletId,
      type: payload.type,
      shares: payload.shares,
      price: payload.price,
    });
    return order;
  }
}
