import { Module } from '@nestjs/common';
import { LikePostController } from './like-post.controller';
import { LikePostService } from './like-post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikePost } from './like-post.entity';
import { Video } from '../video/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikePost, Video])],
  controllers: [LikePostController],
  providers: [LikePostService],
})
export class LikePostModule {}
