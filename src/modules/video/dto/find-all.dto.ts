import { IsOptional, IsString } from 'class-validator';

export class FindAllDto {
  @IsString()
  @IsOptional()
  term: string;
}
