import { Controller, Get, Param } from '@nestjs/common';
import { LikePost } from './like-post.entity';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { OrderDto } from 'src/shared/dtos/order.dto';
import { LikePostService } from './like-post.service';
import { QueryPagination } from 'src/shared/decorators/query-pagination.decorator';
import { QueryOrder } from 'src/shared/decorators/order-query';
import { Paginate } from 'src/shared/classes/paginate';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Like')
@Controller('like')
export class LikePostController {
  constructor(private readonly LikeService: LikePostService) {}

  @Get(':postId')
  async getAllByPost(
    @Param('postId') postId: uuid,
    @QueryPagination() pagination: PaginationDto,
    @QueryOrder() order: OrderDto,
  ): Promise<Paginate<LikePost>> {
    const [items, total] = await this.LikeService.getAllByPost(
      postId,
      pagination,
      order,
    );

    return new Paginate(items, pagination.getPagination(total));
  }
}
