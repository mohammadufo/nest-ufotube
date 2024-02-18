import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { User } from '../user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async create(body: CreateCommentDto, user: User) {
    const comment = this.commentRepo.create(body);
    comment.author = user;

    return await this.commentRepo.save(comment);
  }

  async getAll() {
    return this.commentRepo.find({
      relations: ['author', 'video'],
    });
  }
}
