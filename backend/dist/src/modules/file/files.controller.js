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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const public_decorator_1 = require("../../shared/decorators/public.decorator");
const user_decorators_1 = require("../../shared/decorators/user.decorators");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const files_service_1 = require("./files.service");
const multer_1 = __importDefault(require("multer"));
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async uploadFile(file) {
        return await this.filesService.uploadFile(file);
    }
    myUploadedVideos(user) {
        return this.filesService.getMyUploadedVideos(user);
    }
    myUploadedImages(user) {
        return this.filesService.getMyUploadedFiles(user);
    }
    serveFile(filename, res) {
        return res.sendFile(filename, {
            root: path_1.default.resolve(`./{${coreConstant_1.coreConstant.FILE_DESTINATION}}`),
        });
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: multer_1.default.memoryStorage() })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('my-uploaded-videos'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "myUploadedVideos", null);
__decorate([
    (0, common_1.Get)('my-uploaded-images'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "myUploadedImages", null);
__decorate([
    (0, common_1.Get)(':filename'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "serveFile", null);
FilesController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map