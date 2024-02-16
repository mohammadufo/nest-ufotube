import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty()
  @IsString()
  @Length(5, 200, { message: 'title must have more than 4 character' })
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  videoUrl: string;

  @ApiProperty()
  @IsString()
  imageUrl: string;
}
