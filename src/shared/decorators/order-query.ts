import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const QueryOrder = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      order: request.query.orderBy || '',
      orderBy: (request.query.order && request.query.order.toUpperCase()) || '',
    };
  },
);
