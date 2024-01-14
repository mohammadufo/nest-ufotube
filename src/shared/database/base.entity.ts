import { Exclude, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @IsDate()
  updated_at: Date;

  @DeleteDateColumn()
  @Exclude()
  public deletedAt: Date;
}
