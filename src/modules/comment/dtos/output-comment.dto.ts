import { Expose, Type } from 'class-transformer';
import { OutputUserDto } from 'src/modules/user/dtos/output-user.dto';
import { User } from 'src/modules/user/user.entity';
import { Video } from 'src/modules/video/video.entity';

export class outputVideoDto extends Video {
  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  id: string;
}

export class OutputCommentDto {
  @Expose()
  rate: number;

  @Expose()
  content: string;

  @Expose()
  videoId: string;

  @Expose()
  @Type(() => outputVideoDto)
  video: outputVideoDto;

  @Expose()
  authorId: string;

  @Expose()
  @Type(() => OutputUserDto)
  author: OutputUserDto;
}
