// payment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  paymentPlan: string; // 'basic' or 'premium'

  @Prop({ required: true })
  paymentReference: string;

  @Prop({ required: true })
  status: string; // 'pending', 'completed', 'failed'
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
