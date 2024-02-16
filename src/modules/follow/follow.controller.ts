import { Controller, Get } from '@nestjs/common';
import { FollowService } from './follow.service';
import { QueryPagination } from 'src/shared/decorators/query-pagination.decorator';
import { QueryOrder } from 'src/shared/decorators/order-query';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { OrderDto } from 'src/shared/dtos/order.dto';
import { Paginate } from 'src/shared/classes/paginate';
import { Follow } from './follow.entity';
import { GetWithPagination } from 'src/shared/decorators/get-with-pagination.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Follow')
@Controller('/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @GetWithPagination('')
  async getAll(
    @QueryPagination() pagination: PaginationDto,
    @QueryOrder() order: OrderDto,
  ): Promise<Paginate<Follow>> {
    const [items, total] = await this.followService.getAll(pagination, order);

    return new Paginate(items, pagination.getPagination(total));
  }
}
