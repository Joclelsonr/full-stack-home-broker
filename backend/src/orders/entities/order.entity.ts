import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from 'src/wallets/entities/wallet.entity';
import { Asset, AssetDocument } from 'src/assets/entities/asset.entity';
import crypto from 'crypto';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  partial: number;

  @Prop()
  price: number;

  @Prop({ type: String, ref: Wallet.name })
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  @Prop({ type: String, enum: ['BUY', 'SELL'] })
  type: 'BUY' | 'SELL';

  @Prop({ type: String, enum: ['PENDING', 'OPEN', 'CLOSED', 'FAILED'] })
  status: 'PENDING' | 'OPEN' | 'CLOSED' | 'FAILED';

  createdAt!: Date;
  updatedAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
