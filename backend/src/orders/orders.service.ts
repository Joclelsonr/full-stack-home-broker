import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Asset } from 'src/assets/entities/asset.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderSchema: Model<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderSchema.create({
      wallet: createOrderDto.walletId,
      asset: createOrderDto.asssetId,
      shares: createOrderDto.shares,
      partial: createOrderDto.shares,
      type: createOrderDto.type,
      status: 'PENDING',
    });
  }

  findAll(filter: { walletId: string }) {
    return this.orderSchema
      .find({ wallet: filter.walletId })
      .populate('asset') as Promise<(Order & { asset: Asset })[]>;
    //.populate(['asset', 'trade']);
  }

  findOne(id: string) {
    return this.orderSchema.findById(id);
    //.populate(['asset', 'trade']);
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
