"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let SocialMediaService = class SocialMediaService {
    async createNewSocialMedia(payload) {
        try {
            let image_url = null;
            if (payload.file_id) {
                const fileDetails = await functions_1.PrismaClient.myUploads.findFirst({
                    where: {
                        id: payload.file_id,
                    },
                });
                if (!fileDetails) {
                    return (0, functions_1.errorResponse)('Invalid image request!');
                }
                image_url = fileDetails.file_path;
            }
            const newSocialMedia = await functions_1.PrismaClient.socialMedia.create({
                data: {
                    name: payload.name,
                    status: payload.status,
                    link: payload.link,
                    image_url: image_url,
                },
            });
            return (0, functions_1.successResponse)('New Social Media is addedd successfully!', newSocialMedia);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getSocialMediaListForAdmin(payload) {
        try {
            const data = {};
            const whereClause = payload.search
                ? {
                    name: {
                        contains: payload.search,
                    },
                }
                : {};
            if (payload.limit || payload.offset) {
                const paginate = await (0, functions_1.paginatioOptions)(payload);
                const socialMediaList = await functions_1.PrismaClient.socialMedia.findMany(Object.assign({ where: whereClause }, paginate));
                const paginationMeta = socialMediaList.length > 0
                    ? await (0, functions_1.paginationMetaData)('socialMedia', payload, whereClause)
                    : coreConstant_1.DefaultPaginationMetaData;
                data['list'] = socialMediaList;
                data['meta'] = paginationMeta;
            }
            else {
                const socialMediaList = await functions_1.PrismaClient.socialMedia.findMany({
                    where: whereClause,
                });
                data['list'] = socialMediaList;
            }
            data['list'].map(function (query) {
                return (query.image_url = (0, functions_1.addPhotoPrefix)(query.image_url));
            });
            return (0, functions_1.successResponse)('Social Media List data', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getSocialMediaDetails(id) {
        try {
            const socialMediaDetails = await functions_1.PrismaClient.socialMedia.findFirst({
                where: {
                    id: id,
                },
            });
            if (!socialMediaDetails) {
                return (0, functions_1.errorResponse)('Invalid request');
            }
            socialMediaDetails.image_url = (0, functions_1.addPhotoPrefix)(socialMediaDetails.image_url);
            return (0, functions_1.successResponse)('Social Media details', socialMediaDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateSocialMedia(social_media_id, payload) {
        try {
            let image_url = null;
            if (payload.file_id) {
                const fileDetails = await functions_1.PrismaClient.myUploads.findFirst({
                    where: {
                        id: payload.file_id,
                    },
                });
                if (!fileDetails) {
                    return (0, functions_1.errorResponse)('Invalid image request!');
                }
                image_url = fileDetails.file_path;
            }
            const socialMediaDetails = await functions_1.PrismaClient.socialMedia.findFirst({
                where: {
                    id: social_media_id,
                },
            });
            if (!socialMediaDetails) {
                return (0, functions_1.errorResponse)('Invalid request!');
            }
            const updateSocialMedia = await functions_1.PrismaClient.socialMedia.update({
                where: {
                    id: socialMediaDetails.id,
                },
                data: {
                    name: payload.name,
                    status: payload.status,
                    image_url: image_url ? image_url : socialMediaDetails.image_url,
                    link: payload.link,
                },
            });
            return (0, functions_1.successResponse)('Social Media is updated successfully!', updateSocialMedia);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteSocialMedia(id) {
        try {
            const details = await functions_1.PrismaClient.socialMedia.findFirst({
                where: {
                    id: id,
                },
            });
            if (!details) {
                return (0, functions_1.errorResponse)('Invalid request!');
            }
            await functions_1.PrismaClient.socialMedia.delete({
                where: {
                    id: details.id,
                },
            });
            return (0, functions_1.successResponse)('Social media is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
SocialMediaService = __decorate([
    (0, common_1.Injectable)()
], SocialMediaService);
exports.SocialMediaService = SocialMediaService;
//# sourceMappingURL=social-media.service.js.map