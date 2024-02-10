import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikePost } from './like-post.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { Video } from '../video/video.entity';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { OrderDto } from 'src/shared/dtos/order.dto';

@Injectable()
export class LikePostService {
  constructor(
    @InjectRepository(LikePost) private readonly likeRepo: Repository<LikePost>,
    @InjectRepository(Video) private readonly videoRepo: Repository<Video>,
  ) {}

  async getAllByPost(
    postId: uuid,
    pagination: PaginationDto,
    order: OrderDto,
  ): Promise<[LikePost[], number]> {
    const post = await this.videoRepo.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found!');
    }

    const options: FindManyOptions<LikePost> = {};

    options.where = {
      postId: postId,
    };

    if (order?.order) {
      options.order = { [order.order]: order.orderBy };
    } else {
      options.order = { created_at: 'DESC' };
    }

    if (pagination) {
      options.skip = pagination.skip;
      options.take = pagination.size;
    }

    options.relations = ['user'];

    return this.likeRepo.findAndCount(options);
  }
}
