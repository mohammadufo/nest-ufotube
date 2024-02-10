import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Video } from '../video/video.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/shared/database/base.entity';

@Entity()
export class LikePost extends BaseEntity {
  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ManyToOne(() => Video, (video) => video.likes)
  @JoinColumn({ name: 'postId' })
  post: Video;

  @Column()
  @IsString()
  @IsNotEmpty()
  postId: string;
}
