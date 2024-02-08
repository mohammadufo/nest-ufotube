import { Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from 'src/shared/interseptors/transformer.interceptor';
import { OutputUserDto } from './dtos/output-user.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { Follow } from '../follow/follow.entity';

// @Serialize(OutputUserDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Serialize(OutputUserDto)
  getAllUsers() {
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
  getFollowers(@CurrentUser() user: User): Promise<Follow[]> {
    return this.userService.getFollowers(user);
  }
}
