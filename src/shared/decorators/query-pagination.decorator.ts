import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDto } from '../dtos/pagination.dto';

export const QueryPagination = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const pagination: PaginationDto = new PaginationDto();
    pagination.page = +request.query.page || pagination.page;
    pagination.size = +request.query.size || pagination.size;
    return pagination;
  },
);
