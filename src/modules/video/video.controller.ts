import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { FindAllDto } from './dto/find-all.dto';
import { PaginateInterceptor } from 'src/shared/interseptors/paginate.interseptor';
import { QueryPagination } from 'src/shared/decorators/query-pagination.decorator';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../user/user.entity';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @UseInterceptors(PaginateInterceptor)
  getAllVideos(
    @QueryPagination() pagination: PaginationDto,
    @Query('filters') query: FindAllDto,
  ) {
    return this.videoService.findAll(pagination, query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createVideo(@Body() body: CreateVideoDto, @CurrentUser() user: User) {
    return this.videoService.create(body, user);
  }

  @Get(':id')
  getVideoById(@Param('id') id: string) {
    return this.videoService.findById(id);
  }
}
