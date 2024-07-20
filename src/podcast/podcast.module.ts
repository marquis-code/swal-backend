// podcast.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PodcastService } from './podcast.service';
import { PodcastController } from './podcast.controller';
import { Podcast, PodcastSchema } from './schemas/podcast.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Podcast.name, schema: PodcastSchema }])],
  providers: [PodcastService],
  controllers: [PodcastController],
})
export class PodcastModule {}