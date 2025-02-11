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
exports.AdminEarningController = void 0;
const common_1 = require("@nestjs/common");
const earning_service_1 = require("../earning.service");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_config_1 = require("../../../shared/configs/file-upload.config");
const withdraw_status_updated_dto_1 = require("./dto/withdraw-status-updated.dto");
let AdminEarningController = class AdminEarningController {
    constructor(earningService) {
        this.earningService = earningService;
    }
    getWithdrawEarningForAdmin(payload) {
        return this.earningService.getWithdrawEarningForAdmin(payload);
    }
    updateWithdrawRequest(file, payload) {
        return this.earningService.updateWithdrawRequest(payload, file);
    }
    getInstructorWalletList(payload) {
        return this.earningService.getInstructorWalletList(payload);
    }
};
__decorate([
    (0, common_1.Get)('withdraw-list'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminEarningController.prototype, "getWithdrawEarningForAdmin", null);
__decorate([
    (0, common_1.Post)('withdraw-status-update'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', file_upload_config_1.fileUploadConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, withdraw_status_updated_dto_1.WithdrawStatusUpdatedDto]),
    __metadata("design:returntype", void 0)
], AdminEarningController.prototype, "updateWithdrawRequest", null);
__decorate([
    (0, common_1.Get)('instructor-wallet-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminEarningController.prototype, "getInstructorWalletList", null);
AdminEarningController = __decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [earning_service_1.EarningService])
], AdminEarningController);
exports.AdminEarningController = AdminEarningController;
//# sourceMappingURL=admin-earning.controller.js.map