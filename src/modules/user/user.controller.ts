import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from 'src/shared/interseptors/transformer.interceptor';
import { OutputUserDto } from './dtos/output-user.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';

@Serialize(OutputUserDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put('subscribe/:userId')
  @UseGuards(JwtAuthGuard)
  subScribe(@Param('userId') userId: string, @CurrentUser() user: User) {
    return this.userService.subscribe(userId, user);
  }
}
