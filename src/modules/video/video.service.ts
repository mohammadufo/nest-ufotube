import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { FindAllDto } from './dto/find-all.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { User } from '../user/user.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) private videoRepo: Repository<Video>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(body: CreateVideoDto, user: User) {
    const video = this.videoRepo.create(body);
    video.user = user;

    return await this.videoRepo.save(video);
  }

  async findAll(pagination: PaginationDto, query: FindAllDto) {
    const options: FindManyOptions<Video> = {};

    if (query?.term) {
      options.where = {
        title: Like(`%${query?.term}%`),
      };
    }

    if (pagination.page && pagination?.size) {
      const page = pagination.page || 1;
      const size = pagination.size || 20;

      options.skip = (page - 1) * size;
      options.take = size;
    }

    if (query?.orderByNewest) {
      options.order = {
        created_at: 'DESC',
      };
    }

    return this.videoRepo.findAndCount(options);
  }

  async findById(id: string) {
    return this.videoRepo.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }
}
