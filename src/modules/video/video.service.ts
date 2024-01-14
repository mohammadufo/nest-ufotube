import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepo: Repository<Video>) {}

  async create(body: CreateVideoDto) {
    const video = this.videoRepo.create(body);

    return await this.videoRepo.save(video);
  }

  async findAll() {
    return this.videoRepo.find();
  }

  async findById(id: string) {
    return this.videoRepo.findOneBy({ id });
  }
}
