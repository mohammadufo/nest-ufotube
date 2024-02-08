import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { OrderDto } from 'src/shared/dtos/order.dto';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private readonly followRepo: Repository<Follow>,
  ) {}

  async getAll(
    pagination: PaginationDto,
    order: OrderDto,
  ): Promise<[Follow[], number]> {
    const options: FindManyOptions<Follow> = {};

    if (order?.order) {
      options.order = { [order.order]: order.orderBy };
    } else {
      options.order = { created_at: 'DESC' };
    }
    if (pagination) {
      options.skip = pagination.skip;
      options.take = pagination.size;
    }

    options.relations = ['follower', 'leader'];

    return this.followRepo.findAndCount(options);
  }
}
