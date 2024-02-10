import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './modules/video/video.module';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';
import { FollowModule } from './modules/follow/follow.module';
import { UploadModule } from './modules/upload/upload.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { LikePostModule } from './modules/like-post/like-post.module';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_Env !== 'production' ? ormConfig : ormConfigProd,
    }),
    VideoModule,
    UserModule,
    CommentModule,
    FollowModule,
    UploadModule,
    CloudinaryModule,
    LikePostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
