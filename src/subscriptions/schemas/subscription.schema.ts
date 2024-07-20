// subscription.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  paymentPlan: string; // 'basic' or 'premium'

  @Prop({ required: true, default: Date.now })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, default: 'active' })
  status: string; // 'active', 'expired', 'cancelled'
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
