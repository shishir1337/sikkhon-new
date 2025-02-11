"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaModule = void 0;
const common_1 = require("@nestjs/common");
const social_media_admin_controller_1 = require("./admin/social-media-admin.controller");
const social_media_service_1 = require("./social-media.service");
let SocialMediaModule = class SocialMediaModule {
};
SocialMediaModule = __decorate([
    (0, common_1.Module)({
        controllers: [social_media_admin_controller_1.AdminSocialMediaController],
        providers: [social_media_service_1.SocialMediaService]
    })
], SocialMediaModule);
exports.SocialMediaModule = SocialMediaModule;
//# sourceMappingURL=social-media.module.js.map