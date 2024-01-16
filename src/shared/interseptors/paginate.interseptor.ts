import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PaginateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        const request = context.switchToHttp().getRequest();

        const page = +request.query.page;
        const size = +request.query.size;

        const total = data[1];
        const totalPages = Math.ceil(total / size);

        const result = {
          items: data[0],
          page,
          size,
          total,
          totalPages,
        };

        return result;
      }),
    );
  }
}
