import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Response } from 'express';
import path from 'path';
import { Public } from 'src/shared/decorators/public.decorator';
import { UserInfo } from 'src/shared/decorators/user.decorators';
import { coreConstant } from 'src/shared/helpers/coreConstant';
import { FilesService } from './files.service';
import multer from 'multer';

interface UploadResponse {
  success: boolean;
  url?: string;
  message?: string;
}

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadFile(@UploadedFile() file: any): Promise<{ url: string }> {
    return await this.filesService.uploadFile(file);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', multerUploadConfig))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return 'done';
  // }

  @Get('my-uploaded-videos')
  myUploadedVideos(@UserInfo() user: User) {
    return this.filesService.getMyUploadedVideos(user);
  }

  @Get('my-uploaded-images')
  myUploadedImages(@UserInfo() user: User) {
    return this.filesService.getMyUploadedFiles(user);
  }

  @Get(':filename')
  @Public()
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, {
      root: path.resolve(`./{${coreConstant.FILE_DESTINATION}}`),
    });
  }
}
