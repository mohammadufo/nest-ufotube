import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/shared/database/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { LikePost } from '../like-post/like-post.entity';

@Entity()
export class Video extends BaseEntity {
  @Column({ unique: true })
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  imageUrl: string;

  @Column()
  @IsString()
  videoUrl: string;

  @ManyToOne(() => User, (user) => user.videos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @OneToMany(() => Comment, (comment) => comment.video, {
    nullable: true,
  })
  comments: Comment[];

  @OneToMany(() => LikePost, (like) => like.post, {
    cascade: ['remove'],
  })
  likes: LikePost[];
}
