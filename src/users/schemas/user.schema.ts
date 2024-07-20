// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['user', 'coach', 'admin'], default: 'user' })
  role: string; // 'user', 'coach', 'admin'

  @Prop()
  subscriptionPlan: string; // 'basic' or 'premium'
}

export const UserSchema = SchemaFactory.createForClass(User);
