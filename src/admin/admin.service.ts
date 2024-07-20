// admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../blog/schemas/blog.schema';
import { Podcast, PodcastDocument } from '../podcast/schemas/podcast.schema';
import { CreateBlogDto } from '../blog/dto/create-blog.dto';
import { CreatePodcastDto } from '../podcast/dto/create-podcast.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Podcast.name) private podcastModel: Model<PodcastDocument>,
  ) {}

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
  }

  async createPodcast(createPodcastDto: CreatePodcastDto): Promise<Podcast> {
    const createdPodcast = new this.podcastModel(createPodcastDto);
    return createdPodcast.save();
  }

  async findAllBlogs(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findAllPodcasts(): Promise<Podcast[]> {
    return this.podcastModel.find().exec();
  }

  async findBlogById(id: string): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  }

  async findPodcastById(id: string): Promise<Podcast> {
    return this.podcastModel.findById(id).exec();
  }

  async deleteBlog(id: string): Promise<Blog> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }

  async deletePodcast(id: string): Promise<Podcast> {
    return this.podcastModel.findByIdAndDelete(id).exec();
  }
}
