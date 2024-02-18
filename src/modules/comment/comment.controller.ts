import { Body, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CommentService } from './comment.service';
import { ControllerInfo } from 'src/shared/decorators/controller-info.decorator';
import { Modules } from 'src/shared/enums/modules.enum';
import { Serialize } from 'src/shared/interseptors/transformer.interceptor';
import { OutputUserDto } from '../user/dtos/output-user.dto';
import { OutputCommentDto } from './dtos/output-comment.dto';

@ControllerInfo(Modules.Comment, 'comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createComment(@Body() body: CreateCommentDto, @CurrentUser() user: User) {
    return this.commentService.create(body, user);
  }

  @Get()
  @Serialize(OutputCommentDto)
  getAllComments() {
    return this.commentService.getAll();
  }
}
