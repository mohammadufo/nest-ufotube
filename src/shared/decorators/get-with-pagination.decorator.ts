import { applyDecorators, Get } from '@nestjs/common';

/**
 *
 * @param path
 **/
export function GetWithPagination(path: string) {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [Get(path !== '/' && path !== '' ? `/paginated/${path}` : 'paginated')];

  return applyDecorators(...decorators);
}
