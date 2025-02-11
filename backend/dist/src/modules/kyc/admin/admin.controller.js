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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const add_new_kyc_dto_1 = require("./dto/add-new-kyc.dto");
const kyc_service_1 = require("../kyc.service");
const verify_user_kyc_dto_1 = require("./dto/verify-user-kyc.dto");
let AdminController = class AdminController {
    constructor(kycService) {
        this.kycService = kycService;
    }
    addNewKyc(payload) {
        return this.kycService.addNewKyc(payload);
    }
    getKycListAdmin(payload) {
        return this.kycService.getKycListAdmin(payload);
    }
    getKycDetails(id) {
        return this.kycService.getKycDetails(id);
    }
    updateKyc(id, payload) {
        return this.kycService.updateKyc(id, payload);
    }
    deleteKyc(id) {
        return this.kycService.deleteKyc(id);
    }
    getUserKycList(payload) {
        return this.kycService.getUserKycList(payload);
    }
    verifyUserKyc(payload) {
        return this.kycService.verifyUserKyc(payload);
    }
};
__decorate([
    (0, common_1.Post)('add-new-kyc'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_new_kyc_dto_1.AddNewKycDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addNewKyc", null);
__decorate([
    (0, common_1.Get)('kyc-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getKycListAdmin", null);
__decorate([
    (0, common_1.Get)('kyc-details-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getKycDetails", null);
__decorate([
    (0, common_1.Put)('update-kyc-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_new_kyc_dto_1.AddNewKycDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateKyc", null);
__decorate([
    (0, common_1.Delete)('delete-kyc-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteKyc", null);
__decorate([
    (0, common_1.Get)('get-user-kyc-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUserKycList", null);
__decorate([
    (0, common_1.Post)('verify-user-kyc'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_user_kyc_dto_1.VerifyUserKycDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyUserKyc", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [kyc_service_1.KycService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map