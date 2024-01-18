import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from './user.entity';
import { LocalAuthGuard } from 'src/shared/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: this.userService.generateToken(user),
    };
  }
}
