import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(body: CreateUserDto) {
    const user = this.userRepo.create(body);

    return await this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findById(id: string) {
    return this.userRepo.findOneBy({ id });
  }
}
