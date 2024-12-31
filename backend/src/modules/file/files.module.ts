import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [PrismaModule],
  exports: [FilesService],
})
export class FilesModule {}
