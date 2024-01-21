import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

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
    return this.userRepo.find({
      relations: {
        followers: true,
      },
    });
  }

  async findById(id: string) {
    return await this.userRepo.findOne({
      where: { id },
      relations: {
        followers: true,
      },
    });

    // return this.userRepo.findOne(id, {
    //   relations: ['followers', 'following'],
    // });
  }

  async subscribe(id: string, user: User) {
    const channel = await this.userRepo.findOne({
      where: { id },
      relations: {
        followers: true,
      },
    });

    if (!channel) {
      throw new NotFoundException('User Not Found!');
    }

    channel.followers = [...channel.followers, user];

    const updatedChannel = await this.userRepo.save(channel);

    return !!updatedChannel;
  }
}
