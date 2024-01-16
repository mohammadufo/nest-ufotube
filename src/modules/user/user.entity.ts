import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/shared/database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Video } from '../video/video.entity';

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
}
