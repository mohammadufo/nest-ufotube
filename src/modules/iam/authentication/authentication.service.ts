import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { pgUniqueViolationErrorCode } from 'src/shared/constants/errors.constants';
import { SignInDto } from './dto/sign-in.dto';

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

  async signIn(body: SignInDto) {
    const user = await this.userRepo.findOneBy({
      email: body.email,
    });

    if (!user) {
      throw new UnauthorizedException('This user dose not exist!');
    }

    const isEqual = await this.hashingService.compare(
      body.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Passwords dose not match!');
    }

    return true;
  }
}
