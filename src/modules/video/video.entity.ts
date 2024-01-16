import { IsString } from 'class-validator';
import { BaseEntity } from 'src/shared/database/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

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
  userId: string;
}
