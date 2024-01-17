// user.dto.ts
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OutputUserDto {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  profileImage: string;

  @Expose()
  id: string;

  @Expose()
  token: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  deletedAt: Date;
}
