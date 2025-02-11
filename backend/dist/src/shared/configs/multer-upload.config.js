"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploadConfig = exports.maxVideoUploadSize = exports.maxImageUploadSize = exports.validVideoUploadTypesRegex = exports.validImageUploadTypesRegex = void 0;
const multer_1 = require("multer");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const functions_1 = require("../helpers/functions");
const coreConstant_1 = require("../helpers/coreConstant");
const common_1 = require("@nestjs/common");
exports.validImageUploadTypesRegex = /jpeg|jpg|png|gif|bmp|webp|svg|image\/svg\+xml/;
exports.validVideoUploadTypesRegex = /mp4|mkv|x-matroska/;
exports.maxImageUploadSize = 3 * 1024 * 1024;
exports.maxVideoUploadSize = 2000 * 1024 * 1024;
const uploadDirectory = `./${coreConstant_1.coreConstant.FILE_DESTINATION}`;
if (!fs_1.default.existsSync(uploadDirectory)) {
    fs_1.default.mkdirSync(uploadDirectory);
}
exports.multerUploadConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: uploadDirectory,
        filename: (request, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const user = request.user;
            const { originalname, mimetype } = file;
            const fileName = `${uniqueSuffix}-${file.originalname}`;
            const isExtnameValidForImage = exports.validImageUploadTypesRegex.test(path_1.default.extname(file.originalname).toLowerCase());
            const isExtnameValidForVideo = exports.validVideoUploadTypesRegex.test(path_1.default.extname(file.originalname).toLowerCase());
            if ((isExtnameValidForImage && file.size > exports.maxImageUploadSize) ||
                (isExtnameValidForVideo && file.size > exports.maxVideoUploadSize)) {
                return callback(new Error('File size exceeds the maximum allowed size'), null);
            }
            functions_1.PrismaClient.myUploads
                .create({
                data: {
                    user: {
                        connect: { id: user.id },
                    },
                    fieldname: originalname,
                    mimetype: mimetype,
                    originalname: originalname,
                    file_path: `/${coreConstant_1.coreConstant.FILE_DESTINATION}/${fileName}`,
                    filename: fileName,
                },
            })
                .then((res) => {
                console.log(res, 'res');
            });
            return callback(null, fileName);
        },
    }),
    fileFilter: (request, file, callback) => {
        const isMimetypeValid = exports.validImageUploadTypesRegex.test(file.mimetype);
        const isExtnameValid = exports.validImageUploadTypesRegex.test(path_1.default.extname(file.originalname).toLowerCase());
        const isMimetypeValidVideo = exports.validVideoUploadTypesRegex.test(file.mimetype);
        const isExtnameValidVideo = exports.validVideoUploadTypesRegex.test(path_1.default.extname(file.originalname).toLowerCase());
        if ((isMimetypeValid && isExtnameValid) ||
            (isMimetypeValidVideo && isExtnameValidVideo)) {
            return callback(null, true);
        }
        return callback(new common_1.NotFoundException('Invalid file type'), false);
    },
};
const maxAudioUploadSize = 5000 * 1024 * 1024;
//# sourceMappingURL=multer-upload.config.js.map