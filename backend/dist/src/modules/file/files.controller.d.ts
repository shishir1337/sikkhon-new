import { User } from '@prisma/client';
import { Response } from 'express';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    myUploadedVideos(user: User): Promise<import("../../shared/models/response.model").ResponseModel>;
    myUploadedImages(user: User): Promise<import("../../shared/models/response.model").ResponseModel>;
    serveFile(filename: string, res: Response): void;
}
