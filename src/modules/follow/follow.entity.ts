import { BaseEntity } from 'src/shared/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../user/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
@Unique(['leaderId', 'followerId'])
export class Follow extends BaseEntity {
  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'leaderId' })
  leader: User;

  @Column()
  @IsString()
  @IsNotEmpty()
  leaderId: string;

  @ManyToOne(() => User, (user) => user.followings)
  @JoinColumn({ name: 'followerId' })
  follower: User;

  @Column()
  @IsString()
  @IsNotEmpty()
  followerId: string;
}
