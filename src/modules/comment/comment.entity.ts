import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { BaseEntity } from 'src/shared/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Video } from '../video/video.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(0)
  rate: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  author: User;

  @Column()
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ManyToOne(() => Video, (video) => video.comments)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @Column()
  @IsString()
  @IsNotEmpty()
  videoId: string;
}
