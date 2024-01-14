import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { FindAllDto } from './dto/find-all.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getAllVideos(@Query() query: FindAllDto) {
    return this.videoService.findAll(query);
  }

  @Post()
  createVideo(@Body() body: CreateVideoDto) {
    return this.videoService.create(body);
  }

  @Get(':id')
  getVideoById(@Param('id') id: string) {
    return this.videoService.findById(id);
  }
}
