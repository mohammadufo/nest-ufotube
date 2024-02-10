import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/shared/database/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Video } from '../video/video.entity';
import { Comment } from '../comment/comment.entity';
import { Follow } from '../follow/follow.entity';
import { LikePost } from '../like-post/like-post.entity';

@Entity()
export class User extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(() => Video, (video) => video.user, {
    nullable: true,
  })
  videos: Video[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    nullable: true,
  })
  comments: Comment[];

  @OneToMany(() => Follow, (follow) => follow.follower, {
    nullable: true,
    cascade: ['remove'],
  })
  followers: User[];

  @OneToMany(() => User, (user) => user.followers, {
    nullable: true,
    // cascade: true,
  })
  followings: User[];

  @OneToMany(() => LikePost, (like) => like.user)
  likes: LikePost[];
}
