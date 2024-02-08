import { Controller, Get } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get()
  getAll() {
    return this.followService.getAll();
  }
}
