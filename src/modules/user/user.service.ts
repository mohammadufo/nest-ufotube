import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';
import { Follow } from '../follow/follow.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Follow) private readonly followRepo: Repository<Follow>,
  ) {}

  private readonly logger = new Logger(UserService.name);

  public generateToken(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async create(body: CreateUserDto) {
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Passwords dose not match!');
    }

    const existUser = await this.userRepo.findOne({
      where: [{ username: body?.username }, { email: body.email }],
    });

    if (existUser) {
      throw new BadRequestException('Username or email is already exist!');
    }

    const user = this.userRepo.create(body);
    const hashedPassword = await this.hashPassword(body.password);
    user.password = hashedPassword;

    return {
      ...(await this.userRepo.save(user)),
      token: this.generateToken(user),
    };
  }

  async findAll() {
    return this.userRepo.find({});
  }

  async findById(id: string) {
    return await this.userRepo.findOne({
      where: { id },
    });

    // return this.userRepo.findOne(id, {
    //   relations: ['followers', 'following'],
    // });
  }

  async subscribe(id: string, user: User): Promise<Follow> {
    const channel = await this.userRepo.findOne({
      where: { id },
    });
    if (!channel) {
      throw new NotFoundException('User Not Found!');
    }

    const alreadyFollowed = await this.followRepo.findOne({
      where: {
        leaderId: id,
        followerId: user.id,
      },
    });

    if (alreadyFollowed) {
      throw new BadRequestException('User Already followed!');
    }

    const result = this.followRepo.create({
      follower: user,
      leader: channel,
    });

    return await this.followRepo.save(result);
  }

  async unSubscribe(id: string, user: User): Promise<SuccessStatus> {
    const channel = await this.userRepo.findOne({
      where: { id },
    });
    if (!channel) {
      throw new NotFoundException('User Not Found!');
    }

    const alreadyFollowed = await this.followRepo.findOne({
      where: {
        leaderId: id,
        followerId: user.id,
      },
    });

    if (!alreadyFollowed) {
      throw new BadRequestException('You are not following this user!');
    }

    await this.followRepo.remove(alreadyFollowed);

    return {
      message: 'user has unFollowed!',
      status: 'successful',
    };
  }

  async getFollowers(user: User): Promise<Follow[]> {
    return await this.followRepo.find({
      where: { followerId: user.id },
      relations: ['leader'],
    });
  }
}
