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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorEarningController = void 0;
const common_1 = require("@nestjs/common");
const is_instructor_decorator_1 = require("../../../shared/decorators/is-instructor.decorator");
const earning_service_1 = require("../earning.service");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const client_1 = require("@prisma/client");
const payment_withdraw_request_dto_1 = require("./dto/payment-withdraw-request.dto");
const withdraw_admin_fee_dto_1 = require("./dto/withdraw-admin-fee.dto");
let InstructorEarningController = class InstructorEarningController {
    constructor(earningService) {
        this.earningService = earningService;
    }
    paymentWithdrawRequest(user, payload) {
        return this.earningService.paymentWithdrawRequest(user, payload);
    }
    getWithdrawList(user, payload) {
        return this.earningService.getWithdrawListForInstructor(user, payload);
    }
    getWithdrawAdminFee(user, payload) {
        return this.earningService.getWithdrawAdminFee(user, payload);
    }
    getInstructorSelfEarningDetails(user, payload) {
        return this.earningService.getInstructorSelfEarningDetails(user, payload);
    }
};
__decorate([
    (0, common_1.Post)('withdraw-request'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object, payment_withdraw_request_dto_1.PaymentWithdrawRequestDto]),
    __metadata("design:returntype", void 0)
], InstructorEarningController.prototype, "paymentWithdrawRequest", null);
__decorate([
    (0, common_1.Get)('withdraw-list'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], InstructorEarningController.prototype, "getWithdrawList", null);
__decorate([
    (0, common_1.Post)('withdraw-admin-fee'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object, withdraw_admin_fee_dto_1.WithdrawAdminFeeDto]),
    __metadata("design:returntype", void 0)
], InstructorEarningController.prototype, "getWithdrawAdminFee", null);
__decorate([
    (0, common_1.Get)('instructor-earning-details'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], InstructorEarningController.prototype, "getInstructorSelfEarningDetails", null);
InstructorEarningController = __decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Controller)('instructor'),
    __metadata("design:paramtypes", [earning_service_1.EarningService])
], InstructorEarningController);
exports.InstructorEarningController = InstructorEarningController;
//# sourceMappingURL=instructor-earning.controller.js.map