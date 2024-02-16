import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    // console.log('i love Alaa💕');
    console.log('Request-response time!');
    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
