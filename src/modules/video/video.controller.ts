import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getAllVideos() {
    return this.videoService.findAll();
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
