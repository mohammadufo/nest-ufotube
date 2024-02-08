import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private readonly followRepo: Repository<Follow>,
  ) {}

  async getAll() {
    return await this.followRepo.find({
      relations: {
        follower: true,
        leader: true,
      },
    });
  }
}
