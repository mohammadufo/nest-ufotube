import { IsString } from 'class-validator';
import { BaseEntity } from 'src/shared/database/base.entity';
import { Entity, Column } from 'typeorm';

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
}
