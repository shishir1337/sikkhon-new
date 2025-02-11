"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const minio_config_1 = require("../../shared/configs/minio.config");
const functions_1 = require("../../shared/helpers/functions");
const response_model_1 = require("../../shared/models/response.model");
const prisma_service_1 = require("../prisma/prisma.service");
let FilesService = class FilesService {
    constructor(prisma, minioConfig) {
        this.prisma = prisma;
        this.minioConfig = minioConfig;
        this.bucketName = process.env.MINIO_BUCKET || '';
    }
    async getMyUploadedFiles(user) {
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
                return (0, functions_1.errorResponse)('No files found');
            }
            const filesWithPrefix = myFiles.map((file) => {
                var _a;
                return (Object.assign(Object.assign({}, file), { file_path: ((_a = file.file_path) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                        ? file.file_path
                        : (0, functions_1.addPhotoPrefix)(file.file_path) }));
            });
            return (0, functions_1.successResponse)('Upload successful', filesWithPrefix);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getMyUploadedVideos(user) {
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
                return (0, functions_1.errorResponse)('No files found');
            }
            const filesWithPrefix = myFiles.map((file) => {
                var _a;
                return (Object.assign(Object.assign({}, file), { file_path: ((_a = file.file_path) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                        ? file.file_path
                        : (0, functions_1.addPhotoPrefix)(file.file_path) }));
            });
            return (0, functions_1.successResponse)('Upload successful', filesWithPrefix);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async uploadFile(file) {
        const minioClient = this.minioConfig.getClient();
        try {
            const originalFilename = file.originalname;
            const sanitizedFileName = originalFilename
                .replace(/\s+/g, '-')
                .replace(/[\/\\:*?"<>|]/g, '-');
            const uniqueFilename = `${Date.now()}-${sanitizedFileName}`;
            const bucketExists = await minioClient.bucketExists(this.bucketName);
            if (!bucketExists) {
                await minioClient.makeBucket(this.bucketName, 'us-east-1');
            }
            const fileBuffer = file.buffer;
            if (!fileBuffer) {
                throw new Error('File buffer is undefined');
            }
            await minioClient.putObject(this.bucketName, uniqueFilename, fileBuffer, fileBuffer.length, {
                'Content-Type': file.mimetype,
            });
            return {
                url: `https://${process.env.MINIO_ENDPOINT}/${this.bucketName}/${uniqueFilename}`,
            };
        }
        catch (error) {
            console.error('Error uploading file to MinIO:', error);
            throw new common_1.InternalServerErrorException('Failed to upload file');
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        minio_config_1.MinioConfig])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map