import { Controller, Get } from '@nestjs/common';

@Controller('video')
export class VideoController {
  @Get()
  getAllVideos() {
    return 'I love Alaa';
  }
}
