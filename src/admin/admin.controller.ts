// admin.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateBlogDto } from '../blog/dto/create-blog.dto';
import { CreatePodcastDto } from '../podcast/dto/create-podcast.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guards';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles('admin')
  @Post('blog')
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.adminService.createBlog(createBlogDto);
  }

  @Roles('admin')
  @Post('podcast')
  async createPodcast(@Body() createPodcastDto: CreatePodcastDto) {
    return this.adminService.createPodcast(createPodcastDto);
  }

  @Roles('admin')
  @Get('blogs')
  async findAllBlogs() {
    return this.adminService.findAllBlogs();
  }

  @Roles('admin')
  @Get('podcasts')
  async findAllPodcasts() {
    return this.adminService.findAllPodcasts();
  }

  @Roles('admin')
  @Get('blogs/:id')
  async findBlogById(@Param('id') id: string) {
    return this.adminService.findBlogById(id);
  }

  @Roles('admin')
  @Get('podcasts/:id')
  async findPodcastById(@Param('id') id: string) {
    return this.adminService.findPodcastById(id);
  }

  @Roles('admin')
  @Delete('blogs/:id')
  async deleteBlog(@Param('id') id: string) {
    return this.adminService.deleteBlog(id);
  }

  @Roles('admin')
  @Delete('podcasts/:id')
  async deletePodcast(@Param('id') id: string) {
    return this.adminService.deletePodcast(id);
  }
}
