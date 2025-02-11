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
exports.PublicController = void 0;
const common_1 = require("@nestjs/common");
const public_service_1 = require("./public.service");
const response_model_1 = require("../../shared/models/response.model");
const public_decorator_1 = require("../../shared/decorators/public.decorator");
let PublicController = class PublicController {
    constructor(publicService) {
        this.publicService = publicService;
    }
    getAllLanguageList() {
        return this.publicService.getAllLanguageList();
    }
    commonSettings() {
        return this.publicService.commonSettings();
    }
    getLandingPageData() {
        return this.publicService.getLandingPageData();
    }
    getInstructorProfileDetails(user_name) {
        return this.publicService.getInstructorProfileDetails(user_name);
    }
    getInstructors() {
        return this.publicService.getInstructors();
    }
    getTermsConditionData() {
        return this.publicService.getTermsConditionData();
    }
    getPrivacyPolicyData() {
        return this.publicService.getPrivacyPolicyData();
    }
};
__decorate([
    (0, common_1.Get)('language-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getAllLanguageList", null);
__decorate([
    (0, common_1.Get)('common-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "commonSettings", null);
__decorate([
    (0, common_1.Get)('landing-page-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getLandingPageData", null);
__decorate([
    (0, common_1.Get)('instructor-profile-details-:user_name'),
    __param(0, (0, common_1.Param)('user_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getInstructorProfileDetails", null);
__decorate([
    (0, common_1.Get)('get-instructors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getInstructors", null);
__decorate([
    (0, common_1.Get)('get-terms-condition-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getTermsConditionData", null);
__decorate([
    (0, common_1.Get)('get-privacy-policy-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getPrivacyPolicyData", null);
PublicController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('public-api'),
    __metadata("design:paramtypes", [public_service_1.PublicService])
], PublicController);
exports.PublicController = PublicController;
//# sourceMappingURL=public.controller.js.map