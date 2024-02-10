import { Module } from '@nestjs/common';
import { LikePostController } from './like-post.controller';
import { LikePostService } from './like-post.service';

@Module({
  controllers: [LikePostController],
  providers: [LikePostService],
})
export class LikePostModule {}
