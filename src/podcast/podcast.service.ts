// podcast.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Podcast, PodcastDocument } from './schemas/podcast.schema';

@Injectable()
export class PodcastService {
  constructor(
    @InjectModel(Podcast.name) private podcastModel: Model<PodcastDocument>,
  ) {}

  async create(createPodcastDto: CreatePodcastDto): Promise<Podcast> {
    const createdPodcast = new this.podcastModel(createPodcastDto);
    return createdPodcast.save();
  }

  async findAll(): Promise<Podcast[]> {
    return this.podcastModel.find().exec();
  }
}
