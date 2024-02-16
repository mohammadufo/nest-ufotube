import { Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from 'src/shared/interseptors/transformer.interceptor';
import { OutputUserDto } from './dtos/output-user.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { Follow } from '../follow/follow.entity';
import { QueryPagination } from 'src/shared/decorators/query-pagination.decorator';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { QueryOrder } from 'src/shared/decorators/order-query';
import { OrderDto } from 'src/shared/dtos/order.dto';
import { Paginate } from 'src/shared/classes/paginate';
import { LikePost } from '../like-post/like-post.entity';

// @Serialize(OutputUserDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Serialize(OutputUserDto)
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Serialize(OutputUserDto)
  getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('subscribe/:userId')
  @UseGuards(JwtAuthGuard)
  subScribe(
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ): Promise<Follow> {
    return this.userService.subscribe(userId, user);
  }

  @Post('subscribe/:userId')
  @UseGuards(JwtAuthGuard)
  unsubScribe(
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ): Promise<SuccessStatus> {
    return this.userService.unSubscribe(userId, user);
  }

  @Get('followers/by-user')
  @UseGuards(JwtAuthGuard)
  async getFollowers(
    @CurrentUser() user: User,
    @QueryPagination() pagination: PaginationDto,
    @QueryOrder() order: OrderDto,
  ): Promise<Paginate<Follow>> {
    const [items, total] = await this.userService.getFollowers(
      user,
      pagination,
      order,
    );

    return new Paginate(items, pagination.getPagination(total));
  }

  @Get('followings/by-user')
  @UseGuards(JwtAuthGuard)
  async getFollowings(
    @CurrentUser() user: User,
    @QueryPagination() pagination: PaginationDto,
    @QueryOrder() order: OrderDto,
  ): Promise<Paginate<Follow>> {
    const [items, total] = await this.userService.getFollowings(
      user,
      pagination,
      order,
    );

    return new Paginate(items, pagination.getPagination(total));
  }

  @Post('like/:postId')
  @UseGuards(JwtAuthGuard)
  likePost(
    @CurrentUser() user: User,
    @Param('postId') postId: uuid,
  ): Promise<LikePost | SuccessStatus> {
    return this.userService.likePost(user, postId);
  }
}
