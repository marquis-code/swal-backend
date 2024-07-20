// podcast.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PodcastDocument = Podcast & Document;

@Schema()
export class Podcast {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PodcastSchema = SchemaFactory.createForClass(Podcast);