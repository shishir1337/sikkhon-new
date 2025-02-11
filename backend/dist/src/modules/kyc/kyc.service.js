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
exports.KycService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let KycService = class KycService {
    constructor() { }
    async addNewKyc(payload) {
        try {
            const kycDetails = await functions_1.PrismaClient.kycVerificationList.create({
                data: {
                    name: payload.name,
                    description: payload.description,
                    status: payload.status,
                    is_file_required: payload.is_file_required,
                    is_text_required: payload.is_text_required,
                    verification_for: coreConstant_1.coreConstant.ROLES.INSTRUCTOR,
                },
            });
            return (0, functions_1.successResponse)('Kyc is added successfully!', kycDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateKyc(id, payload) {
        try {
            const kycDetails = await functions_1.PrismaClient.kycVerificationList.findFirst({
                where: {
                    id: id,
                },
            });
            if (!kycDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const updateKyc = await functions_1.PrismaClient.kycVerificationList.update({
                where: {
                    id: id,
                },
                data: {
                    name: payload.name,
                    description: payload.description,
                    status: payload.status,
                    is_file_required: payload.is_file_required,
                    is_text_required: payload.is_text_required,
                    verification_for: coreConstant_1.coreConstant.ROLES.INSTRUCTOR,
                },
            });
            return (0, functions_1.successResponse)('Kyc is updated successfully!', updateKyc);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getKycListAdmin(payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = payload.search
                ? {
                    OR: [
                        {
                            name: {
                                contains: payload.search,
                            },
                        },
                        {
                            description: {
                                contains: payload.search,
                            },
                        },
                    ],
                }
                : {};
            const kycList = await functions_1.PrismaClient.kycVerificationList.findMany(Object.assign({ where: whereCondition }, paginate));
            const data = {
                list: kycList,
                meta: await (0, functions_1.paginationMetaData)('kycVerificationList', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Kyc list for admin', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getKycDetails(id) {
        try {
            const kycDetails = await functions_1.PrismaClient.kycVerificationList.findFirst({
                where: {
                    id: id,
                },
            });
            if (!kycDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            return (0, functions_1.successResponse)('Kyc details', kycDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteKyc(id) {
        try {
            const kycDetails = await functions_1.PrismaClient.kycVerificationList.findFirst({
                where: {
                    id: id,
                },
            });
            if (!kycDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            await functions_1.PrismaClient.kycVerificationList.delete({
                where: {
                    id: kycDetails.id,
                },
            });
            return (0, functions_1.successResponse)('Kyc is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async checkKycValidation(user) {
        try {
            const kycVerificationList = await functions_1.PrismaClient.kycVerificationList.findMany({
                where: {
                    status: coreConstant_1.coreConstant.ACTIVE,
                },
            });
            if (kycVerificationList.length > 0) {
                const userKycVerifiedList = await functions_1.PrismaClient.userKycVerificationList.findMany({
                    where: {
                        userId: user.id,
                        status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    },
                });
                var errorMessage = [];
                kycVerificationList.forEach((kycDetails) => {
                    const exists = userKycVerifiedList.some((userKycDetails) => userKycDetails.kycVerificationListId === kycDetails.id);
                    var tempMessage = {};
                    if (!exists) {
                        tempMessage['message'] = 'please verify your ' + kycDetails.name;
                        errorMessage.push(tempMessage);
                    }
                });
                if (errorMessage.length > 0) {
                    return (0, functions_1.errorResponse)('Kyc verification is incomplete!', errorMessage);
                }
            }
            return (0, functions_1.successResponse)('Kyc verification is complete!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getUserKycVerificationList(user) {
        try {
            const kycList = await functions_1.PrismaClient.kycVerificationList.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                include: {
                    UserKycVerificationList: {
                        where: {
                            userId: user.id,
                        },
                    },
                },
            });
            const formattedKycList = kycList.map((kyc) => {
                const userKycDetails = kyc.UserKycVerificationList[kyc.UserKycVerificationList.length - 1];
                return {
                    id: kyc.id,
                    name: kyc.name,
                    description: kyc.description,
                    verified: userKycDetails
                        ? userKycDetails.status === coreConstant_1.coreConstant.IS_VERIFIED
                        : false,
                    status: userKycDetails ? userKycDetails.status : null,
                    submitted: userKycDetails ? true : false,
                    is_text_required: kyc.is_text_required,
                    is_file_required: kyc.is_file_required,
                    verification_for: kyc.verification_for,
                    created_at: kyc.created_at,
                    updated_at: kyc.updated_at,
                };
            });
            return (0, functions_1.successResponse)('Kyc list', formattedKycList);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async submitKyc(user, payload) {
        try {
            const kycDetails = await functions_1.PrismaClient.kycVerificationList.findFirst({
                where: {
                    id: payload.kyc_verification_id,
                },
            });
            if (!kycDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            if (kycDetails.is_text_required && !payload.text) {
                return (0, functions_1.errorResponse)('Please, enter your details!');
            }
            if (kycDetails.is_file_required && !payload.file_id) {
                return (0, functions_1.errorResponse)('Please, enter your file!');
            }
            let file_url = null;
            if (payload.file_id) {
                const fileDetails = await functions_1.PrismaClient.myUploads.findFirst({
                    where: {
                        id: payload.file_id,
                    },
                });
                if (!fileDetails) {
                    return (0, functions_1.errorResponse)('Invalid image request!');
                }
                file_url = fileDetails.file_path;
            }
            const userKycDetails = await functions_1.PrismaClient.userKycVerificationList.findFirst({
                where: {
                    userId: user.id,
                    kycVerificationListId: payload.kyc_verification_id,
                    status: coreConstant_1.coreConstant.STATUS_PENDING,
                },
            });
            if (userKycDetails) {
                if (userKycDetails.status == coreConstant_1.coreConstant.IS_NOT_VERIFIED) {
                    return (0, functions_1.errorResponse)('You can not update, your ' +
                        kycDetails.name +
                        ' is not verified yet');
                }
                if (userKycDetails.status == coreConstant_1.coreConstant.IS_VERIFIED) {
                    return (0, functions_1.errorResponse)('You can not update, your ' +
                        kycDetails.name +
                        ' is already verified!');
                }
                await functions_1.PrismaClient.userKycVerificationList.update({
                    where: {
                        id: userKycDetails.id,
                    },
                    data: {
                        userId: user.id,
                        text: payload.text,
                        file_url: file_url ? file_url : userKycDetails.file_url,
                        kycVerificationListId: kycDetails.id,
                    },
                });
                return (0, functions_1.successResponse)('Your ' + kycDetails.name + ' is updated successfully!');
            }
            else {
                await functions_1.PrismaClient.userKycVerificationList.create({
                    data: {
                        userId: user.id,
                        text: payload.text,
                        file_url: file_url,
                        kycVerificationListId: kycDetails.id,
                    },
                });
                return (0, functions_1.successResponse)('Your ' + kycDetails.name + ' is submitted successfully!');
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getUserKycList(payload) {
        try {
            const conditions = [
                ...(payload.status ? [{ status: Number(payload.status) }] : []),
                ...(payload.kyc_verification_id
                    ? [{ kycVerificationListId: Number(payload.kyc_verification_id) }]
                    : []),
            ];
            const whereCondition = conditions.length > 0 ? { OR: conditions } : {};
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const userKycList = await functions_1.PrismaClient.userKycVerificationList.findMany(Object.assign({ where: whereCondition, include: {
                    User: true,
                    KycVerificationList: true,
                }, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            let userKycListWithFilePrefix = [];
            if (userKycList.length > 0) {
                userKycListWithFilePrefix = userKycList.map((userKyc) => {
                    return Object.assign(Object.assign({}, userKyc), { file_url: (0, functions_1.addPhotoPrefix)(userKyc.file_url) });
                });
            }
            const data = {
                list: userKycListWithFilePrefix,
                meta: await (0, functions_1.paginationMetaData)('userKycVerificationList', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('User kyc list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async verifyUserKyc(payload) {
        try {
            const userKycDetails = await functions_1.PrismaClient.userKycVerificationList.findFirst({
                where: {
                    id: payload.user_kyc_id,
                },
            });
            if (!userKycDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            await functions_1.PrismaClient.userKycVerificationList.update({
                where: {
                    id: userKycDetails.id,
                },
                data: {
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Kyc status is changed successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
KycService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KycService);
exports.KycService = KycService;
//# sourceMappingURL=kyc.service.js.map