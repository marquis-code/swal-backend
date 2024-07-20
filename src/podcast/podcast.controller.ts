// podcast.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PodcastService } from './podcast.service';

@Controller('podcasts')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Post()
  create(@Body() createPodcastDto) {
    return this.podcastService.create(createPodcastDto);
  }

  @Get()
  findAll() {
    return this.podcastService.findAll();
  }
}