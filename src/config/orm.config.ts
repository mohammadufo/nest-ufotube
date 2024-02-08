import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Comment } from 'src/modules/comment/comment.entity';
import { Follow } from 'src/modules/follow/follow.entity';
import { User } from 'src/modules/user/user.entity';
import { Video } from 'src/modules/video/video.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Video, User, Comment, Follow],
    synchronize: true,
  }),
);
