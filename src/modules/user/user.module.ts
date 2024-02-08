import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { Follow } from '../follow/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '180m',
        },
      }),
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, LocalStrategy, JwtStrategy],
})
export class UserModule {}
