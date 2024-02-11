import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { FindAllDto } from './dto/find-all.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { User } from '../user/user.entity';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) private videoRepo: Repository<Video>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(body: CreateVideoDto, user: User): Promise<Video> {
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

    options.relations = {
      user: true,
    };

    return this.videoRepo.findAndCount(options);
  }

  async findById(id: string): Promise<Video> {
    return this.videoRepo.findOne({
      where: { id },
      relations: {
        user: true,
        comments: true,
      },
    });
  }

  async updateVideo(
    user: User,
    id: uuid,
    body: UpdateVideoDto,
  ): Promise<Video> {
    const video = await this.videoRepo.preload({
      id,
      ...body,
    });

    if (!video) {
      throw new NotFoundException('Can not find video with this Id!');
    }

    if (user.id !== video.userId) {
      throw new BadRequestException('You can update only your videos!');
    }

    return this.videoRepo.save(video);
  }
}
