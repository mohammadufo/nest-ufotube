import { IsOptional, IsString } from 'class-validator';

export class FindAllDto {
  @IsString()
  @IsOptional()
  term: string;

  // @IsNumber()
  @IsOptional()
  page = 0;

  // @IsNumber()
  @IsOptional()
  size = 100;
}
