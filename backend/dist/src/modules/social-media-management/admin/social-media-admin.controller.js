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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSocialMediaController = void 0;
const common_1 = require("@nestjs/common");
const social_media_service_1 = require("../social-media.service");
const store_social_media_dto_1 = require("./dto/store-social-media.dto");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
let AdminSocialMediaController = class AdminSocialMediaController {
    constructor(socialMediaService) {
        this.socialMediaService = socialMediaService;
    }
    createNewSocialMedia(payload) {
        return this.socialMediaService.createNewSocialMedia(payload);
    }
    getSocialMediaList(payload) {
        return this.socialMediaService.getSocialMediaListForAdmin(payload);
    }
    getSocialMediaDetails(id) {
        return this.socialMediaService.getSocialMediaDetails(id);
    }
    updateSocialMedia(social_media_id, payload) {
        return this.socialMediaService.updateSocialMedia(social_media_id, payload);
    }
    deleteSocialMedia(id) {
        return this.socialMediaService.deleteSocialMedia(id);
    }
};
__decorate([
    (0, common_1.Post)('create-new-social-media'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_social_media_dto_1.StoreSocialMediaDto]),
    __metadata("design:returntype", void 0)
], AdminSocialMediaController.prototype, "createNewSocialMedia", null);
__decorate([
    (0, common_1.Get)('get-social-media-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminSocialMediaController.prototype, "getSocialMediaList", null);
__decorate([
    (0, common_1.Get)('social-media-details-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminSocialMediaController.prototype, "getSocialMediaDetails", null);
__decorate([
    (0, common_1.Post)('update-social-media-:social_media_id'),
    __param(0, (0, common_1.Param)('social_media_id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, store_social_media_dto_1.StoreSocialMediaDto]),
    __metadata("design:returntype", void 0)
], AdminSocialMediaController.prototype, "updateSocialMedia", null);
__decorate([
    (0, common_1.Delete)('delete-social-media-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminSocialMediaController.prototype, "deleteSocialMedia", null);
AdminSocialMediaController = __decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [social_media_service_1.SocialMediaService])
], AdminSocialMediaController);
exports.AdminSocialMediaController = AdminSocialMediaController;
//# sourceMappingURL=social-media-admin.controller.js.map