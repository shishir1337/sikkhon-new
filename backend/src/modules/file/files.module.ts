import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MinioConfig } from 'src/shared/configs/minio.config';

@Module({
  controllers: [FilesController],
  providers: [FilesService, MinioConfig],
  imports: [PrismaModule],
  exports: [FilesService],
})
export class FilesModule {}
