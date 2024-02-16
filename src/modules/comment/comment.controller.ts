import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createComment(@Body() body: CreateCommentDto, @CurrentUser() user: User) {
    return this.commentService.create(body, user);
  }

  @Get()
  getAllComments() {
    return this.commentService.getAll();
  }
}
