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
exports.UserVerificationCodeService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const prisma_service_1 = require("../prisma/prisma.service");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let UserVerificationCodeService = class UserVerificationCodeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUserCode(payload) {
        try {
            const checkExists = await this.prisma.userVerificationCodes.findMany({
                where: {
                    user_id: payload.user_id,
                    type: payload.type,
                },
            });
            if (checkExists.length > 0) {
                await this.prisma.userVerificationCodes.deleteMany({
                    where: {
                        user_id: payload.user_id,
                        type: payload.type,
                    },
                });
            }
            const createData = await this.prisma.userVerificationCodes.create({
                data: {
                    user_id: payload.user_id,
                    code: payload.code.toString(),
                    type: payload.type,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    expired_at: (0, functions_1.addDayWithCurrentDate)(5),
                },
            });
            return (0, functions_1.successResponse)('Success', createData);
        }
        catch (err) {
            return (0, functions_1.errorResponse)('Something went wrong');
        }
    }
    async verifyUserCode(user_id, code, type) {
        const userCode = await functions_1.PrismaClient.userVerificationCodes.findFirst({
            where: {
                user_id: user_id,
                code,
                type,
                status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                expired_at: {
                    gte: new Date(),
                },
            },
        });
        if (!userCode) {
            return (0, functions_1.errorResponse)('Invalid or expired verification code');
        }
        await functions_1.PrismaClient.userVerificationCodes.delete({
            where: {
                code: code,
            },
        });
        return (0, functions_1.successResponse)('Verification code successfully validated');
    }
};
UserVerificationCodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserVerificationCodeService);
exports.UserVerificationCodeService = UserVerificationCodeService;
//# sourceMappingURL=user-verify-code.service.js.map