import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';
import { VideoService } from './video.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
