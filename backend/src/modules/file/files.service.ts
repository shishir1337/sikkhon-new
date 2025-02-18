import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import { promises as fsPromises } from 'fs';
import { MinioConfig } from 'src/shared/configs/minio.config';
import {
  addPhotoPrefix,
  errorResponse,
  processException,
  successResponse,
} from 'src/shared/helpers/functions';
import { ResponseModel } from 'src/shared/models/response.model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilesService {
  private readonly bucketName = process.env.MINIO_BUCKET || '';

  constructor(
    private readonly prisma: PrismaService,
    private readonly minioConfig: MinioConfig,
  ) {}

  async getMyUploadedFiles(user: User): Promise<ResponseModel> {
    try {
      const myFiles = await this.prisma.myUploads.findMany({
        where: {
          user_id: user.id,
          mimetype: {
            contains: 'image',
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      if (!myFiles) {
        return errorResponse('No files found');
      }

      // Map through the myFiles array and apply addPhotoPrefix to file_path field
      const filesWithPrefix = myFiles.map((file) => ({
        ...file,
        file_path: file.file_path?.startsWith('http')
          ? file.file_path
          : addPhotoPrefix(file.file_path),
      }));

      return successResponse('Upload successful', filesWithPrefix);
    } catch (error) {
      processException(error);
    }
  }

  async getMyUploadedVideos(user: User): Promise<ResponseModel> {
    try {
      const myFiles = await this.prisma.myUploads.findMany({
        where: {
          user_id: user.id,
          mimetype: {
            contains: 'video',
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      if (!myFiles) {
        return errorResponse('No files found');
      }

      // Map through the myFiles array and apply addPhotoPrefix to file_path field
      const filesWithPrefix = myFiles.map((file) => ({
        ...file,
        file_path: file.file_path?.startsWith('http')
          ? file.file_path
          : addPhotoPrefix(file.file_path),
      }));

      return successResponse('Upload successful', filesWithPrefix);
    } catch (error) {
      processException(error);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    const minioClient = this.minioConfig.getClient();

    try {
      const originalFilename = file.originalname;
      const sanitizedFileName = originalFilename
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[\/\\:*?"<>|]/g, '-'); // Replace invalid characters
      const uniqueFilename = `${Date.now()}-${sanitizedFileName}`;

      // Check if the bucket exists; if not, create it
      const bucketExists = await minioClient.bucketExists(this.bucketName);
      if (!bucketExists) {
        await minioClient.makeBucket(this.bucketName, 'us-east-1');
      }

      // Use the buffer directly
      const fileBuffer = file.buffer;
      if (!fileBuffer) {
        throw new Error('File buffer is undefined');
      }

      // Upload to MinIO
      await minioClient.putObject(
        this.bucketName,
        uniqueFilename,
        fileBuffer,
        fileBuffer.length,
        {
          'Content-Type': file.mimetype, // Set MIME type for the file
        },
      );

      return {
        url: `https://${process.env.MINIO_ENDPOINT}/${this.bucketName}/${uniqueFilename}`,
      };
    } catch (error) {
      console.error('Error uploading file to MinIO:', error);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }
}
