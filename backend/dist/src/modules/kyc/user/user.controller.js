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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const kyc_service_1 = require("../kyc.service");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const client_1 = require("@prisma/client");
const submit_kyc_dto_1 = require("./dto/submit-kyc.dto");
let UserController = class UserController {
    constructor(kycService) {
        this.kycService = kycService;
    }
    getUserKycVerificationList(user) {
        return this.kycService.getUserKycVerificationList(user);
    }
    submitKyc(user, payload) {
        return this.kycService.submitKyc(user, payload);
    }
    checkKycValidation(user) {
        return this.kycService.checkKycValidation(user);
    }
};
__decorate([
    (0, common_1.Get)('kyc-verification-list'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserKycVerificationList", null);
__decorate([
    (0, common_1.Post)('submit-kyc'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object, submit_kyc_dto_1.SubmitKycDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "submitKyc", null);
__decorate([
    (0, common_1.Get)('check-kyc-validation'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkKycValidation", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [kyc_service_1.KycService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map