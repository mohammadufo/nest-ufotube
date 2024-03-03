import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { pgUniqueViolationErrorCode } from 'src/shared/constants/errors.constants';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(body: SignUpDto) {
    try {
      const user = new User();
      user.email = body.email;
      user.password = await this.hashingService.hash(body.password);

      await this.userRepo.save(user);
    } catch (error) {
      if ((error.code = pgUniqueViolationErrorCode)) {
        throw new ConflictException();
      }
      throw error;
    }
  }
}
