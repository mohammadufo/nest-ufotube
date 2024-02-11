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
import { LikePost } from '../like-post/like-post.entity';
import { Video } from '../video/video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow, LikePost, Video]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, LocalStrategy, JwtStrategy],
})
export class UserModule {}
