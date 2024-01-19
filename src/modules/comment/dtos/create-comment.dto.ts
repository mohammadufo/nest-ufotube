import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @Max(5)
  @Min(0)
  rate: number;

  @IsString()
  content: string;

  @IsString()
  videoId: string;
}
