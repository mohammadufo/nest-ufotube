import { Controller, applyDecorators } from '@nestjs/common';
import { Modules } from '../enums/modules.enum';
import { ApiTags } from '@nestjs/swagger';

export function ControllerInfo(module: Modules, controllerPath: string) {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [ApiTags(module as string), Controller(controllerPath)];

  return applyDecorators(...decorators);
}
