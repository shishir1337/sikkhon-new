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
exports.AdminSettingsController = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("../settings.service");
const update_smtp_settings_dt_1 = require("./dto/update-smtp-settings.dt");
const response_model_1 = require("../../../shared/models/response.model");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
const update_terms_privacy_dt_1 = require("./dto/update-terms-privacy.dt");
const update_general_settings_dto_1 = require("./dto/update-general-settings.dto");
const update_google_auth_settings_dto_1 = require("./dto/update-google-auth-settings.dto");
const update_github_auth_settings_dto_1 = require("./dto/update-github-auth-settings.dto");
const update_landing_page_data_dto_1 = require("./dto/update-landing-page-data.dto");
const update_landing_about_section_data_dto_1 = require("./dto/update-landing-about-section-data.dto");
const update_landing_choose_us_section_data_dto_1 = require("./dto/update-landing-choose-us-section-data.dto");
const update_landing_how_it_work_data_dto_1 = require("./dto/update-landing-how-it-work-data.dto");
const update_business_settings_dto_1 = require("./dto/update-business-settings.dto");
const update_agora_credentials_dto_1 = require("./dto/update-agora-credentials.dto");
let AdminSettingsController = class AdminSettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    updateSMTPSettings(payload) {
        return this.settingsService.updateSMTPSettings(payload);
    }
    getSmtpSettingsData() {
        return this.settingsService.getSmtpSettingsData();
    }
    sendTestMail(payload) {
        return this.settingsService.sendTestMail(payload);
    }
    updateTermsPrivacy(payload) {
        return this.settingsService.updateTermsPrivacy(payload);
    }
    getTermsPrivacyData() {
        return this.settingsService.getTermsPrivacyData();
    }
    updateGeneralSettings(payload) {
        return this.settingsService.updateGeneralSettings(payload);
    }
    getGeneralSettingsData() {
        return this.settingsService.getGeneralSettingsData();
    }
    updateGoogleAuthSettings(payload) {
        return this.settingsService.updateGoogleAuthSettings(payload);
    }
    getGoogleAuthSettingsData() {
        return this.settingsService.getGoogleAuthSettingsData();
    }
    updateGithubAuthSettings(payload) {
        return this.settingsService.updateGithubAuthSettings(payload);
    }
    getGithubAuthSettingsData() {
        return this.settingsService.getGithubAuthSettingsData();
    }
    updateLandingMainBannerData(payload) {
        return this.settingsService.updateLandingMainBannerData(payload);
    }
    getLandingMainBannerData() {
        return this.settingsService.getLandingMainBannerData();
    }
    updateLandingAboutSectionData(payload) {
        return this.settingsService.updateLandingAboutSectionData(payload);
    }
    getLandingAboutSectionData() {
        return this.settingsService.getLandingAboutSectionData();
    }
    updateLandingChooseUsSectionData(payload) {
        return this.settingsService.updateLandingChooseUsSectionData(payload);
    }
    getLandingChooseUsSectionData() {
        return this.settingsService.getLandingChooseUsSectionData();
    }
    updateLandingHowItWorkSectionData(payload) {
        return this.settingsService.updateLandingHowItWorkSectionData(payload);
    }
    getLandingHowItWorkSectionData() {
        return this.settingsService.getLandingHowItWorkSectionData();
    }
    updateBusinessSettings(payload) {
        return this.settingsService.updateBusinessSettings(payload);
    }
    getBusinessSettingsData() {
        return this.settingsService.getBusinessSettingsData();
    }
    updateAgoraCredentials(payload) {
        return this.settingsService.updateAgoraCredentials(payload);
    }
    getAgoraSettingsData() {
        return this.settingsService.getAgoraSettingsData();
    }
};
__decorate([
    (0, common_1.Post)('update-smtp-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_smtp_settings_dt_1.updateSMTPSettingsDto]),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "updateSMTPSettings", null);
__decorate([
    (0, common_1.Get)('get-smtp-settings-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "getSmtpSettingsData", null);
__decorate([
    (0, common_1.Post)('send-test-mail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "sendTestMail", null);
__decorate([
    (0, common_1.Post)('update-terms-privacy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_terms_privacy_dt_1.UpdateTermsPrivacyDto]),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "updateTermsPrivacy", null);
__decorate([
    (0, common_1.Get)('get-terms-privacy-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "getTermsPrivacyData", null);
__decorate([
    (0, common_1.Post)('update-general-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_general_settings_dto_1.UpdateGeneralSettingsDto]),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "updateGeneralSettings", null);
__decorate([
    (0, common_1.Get)('general-settings-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "getGeneralSettingsData", null);
__decorate([
    (0, common_1.Post)('update-google-auth-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_google_auth_settings_dto_1.UpdateGoogleAuthSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "updateGoogleAuthSettings", null);
__decorate([
    (0, common_1.Get)('get-google-auth-settings-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getGoogleAuthSettingsData", null);
__decorate([
    (0, common_1.Post)('update-github-auth-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_github_auth_settings_dto_1.UpdateGithubAuthSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "updateGithubAuthSettings", null);
__decorate([
    (0, common_1.Get)('get-github-auth-settings-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getGithubAuthSettingsData", null);
__decorate([
    (0, common_1.Post)('update-landing-main-banner-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_landing_page_data_dto_1.UpdateLandingPageDataDto]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "updateLandingMainBannerData", null);
__decorate([
    (0, common_1.Get)('get-landing-main-banner-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getLandingMainBannerData", null);
__decorate([
    (0, common_1.Post)('update-landing-about-section-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_landing_about_section_data_dto_1.UpdateLandingAboutSectionDataDto]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "updateLandingAboutSectionData", null);
__decorate([
    (0, common_1.Get)('get-landing-about-section-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getLandingAboutSectionData", null);
__decorate([
    (0, common_1.Post)('update-landing-choose-us-section-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_landing_choose_us_section_data_dto_1.UpdateLandingChooseUsSectionDataDto]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "updateLandingChooseUsSectionData", null);
__decorate([
    (0, common_1.Get)('get-landing-choose-us-section-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getLandingChooseUsSectionData", null);
__decorate([
    (0, common_1.Post)('update-landing-how-it-work-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_landing_how_it_work_data_dto_1.UpdateLandingHowItWorkSectionDataDto]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "updateLandingHowItWorkSectionData", null);
__decorate([
    (0, common_1.Get)('get-landing-how-it-work-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getLandingHowItWorkSectionData", null);
__decorate([
    (0, common_1.Post)('update-business-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_business_settings_dto_1.UpdateBusinessSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "updateBusinessSettings", null);
__decorate([
    (0, common_1.Get)('get-business-settings-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getBusinessSettingsData", null);
__decorate([
    (0, common_1.Post)('update-agora-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_agora_credentials_dto_1.UpdateAgoraCredentialsDto]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "updateAgoraCredentials", null);
__decorate([
    (0, common_1.Get)('get-agora-settings-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getAgoraSettingsData", null);
AdminSettingsController = __decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], AdminSettingsController);
exports.AdminSettingsController = AdminSettingsController;
//# sourceMappingURL=admin-settings.controller.js.map