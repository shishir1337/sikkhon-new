"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("./settings.service");
const admin_settings_controller_1 = require("./admin/admin-settings.controller");
const mailer_service_1 = require("../../shared/mail/mailer.service");
const user_settings_controller_1 = require("./user/user-settings.controller");
const public_settings_controller_1 = require("./public/public-settings.controller");
const review_service_1 = require("../review/review.service");
let SettingsModule = class SettingsModule {
};
SettingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            admin_settings_controller_1.AdminSettingsController,
            user_settings_controller_1.UserSettingsController,
            public_settings_controller_1.PublicSettingsController,
        ],
        providers: [settings_service_1.SettingsService, mailer_service_1.MailerService, review_service_1.ReviewService],
        exports: [mailer_service_1.MailerService, review_service_1.ReviewService],
    })
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map