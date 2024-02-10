import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  controllers: [UploadController],
  imports: [CloudinaryModule],
})
export class UploadModule {}
