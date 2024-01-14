import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepo: Repository<Video>) {}

  async create(body: CreateVideoDto) {
    const video = this.videoRepo.create(body);

    return await this.videoRepo.save(video);
  }

  async findAll(query: FindAllDto) {
    const options: FindManyOptions<Video> = {};

    if (query?.term) {
      options.where = {
        title: Like(`%${query?.term}%`),
      };
    }

    if (query.page && query?.size) {
      const page = query.page || 0;
      const size = query.size || 100;

      options.skip = page * size;
      options.take = size;
    }

    return this.videoRepo.find(options);
  }

  async findById(id: string) {
    return this.videoRepo.findOneBy({ id });
  }
}
