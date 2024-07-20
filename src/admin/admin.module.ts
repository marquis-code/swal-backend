// admin.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BlogModule } from '../blog/blog.module';
import { PodcastModule } from '../podcast/podcast.module';

@Module({
  imports: [
    MongooseModule.forFeature([]), // Add any schemas related to admin if needed
    BlogModule,
    PodcastModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
