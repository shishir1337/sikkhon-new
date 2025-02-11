import { User } from '@prisma/client';
import { MinioConfig } from 'src/shared/configs/minio.config';
import { ResponseModel } from 'src/shared/models/response.model';
import { PrismaService } from '../prisma/prisma.service';
export declare class FilesService {
    private readonly prisma;
    private readonly minioConfig;
    private readonly bucketName;
    constructor(prisma: PrismaService, minioConfig: MinioConfig);
    getMyUploadedFiles(user: User): Promise<ResponseModel>;
    getMyUploadedVideos(user: User): Promise<ResponseModel>;
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
