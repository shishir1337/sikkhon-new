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
exports.AdminPaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../payment.service");
const stripe_payment_settings_dto_1 = require("./dto/stripe-payment-settings.dto");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
const razorpay_payment_settings_dto_1 = require("./dto/razorpay-payment-settings.dto");
const paystack_payment_settings_dto_1 = require("./dto/paystack-payment-settings.dto");
const braintree_payment_settings_dto_1 = require("./dto/braintree-payment-settings.dto");
let AdminPaymentController = class AdminPaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    updateStripePaymentSettings(payload) {
        return this.paymentService.updatePaymentStripeSettings(payload);
    }
    getStripePaymentSettings() {
        return this.paymentService.getStripePaymentSettings();
    }
    updateRazorpaySettings(payload) {
        return this.paymentService.updateRazorpaySettings(payload);
    }
    getRazorpayPaymentSettings() {
        return this.paymentService.getRazorpayPaymentSettings();
    }
    updatePaystackSettings(payload) {
        return this.paymentService.updatePaystackSettings(payload);
    }
    getPaystackPaymentSettings() {
        return this.paymentService.getPaystackPaymentSettings();
    }
    updateBrainTreePaymentSettings(payload) {
        return this.paymentService.updateBrainTreePaymentSettings(payload);
    }
    getBraintreePaymentSettings() {
        return this.paymentService.getBraintreePaymentSettings();
    }
};
__decorate([
    (0, common_1.Post)('update-stripe-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stripe_payment_settings_dto_1.UpdatePaymentMethodStripeSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "updateStripePaymentSettings", null);
__decorate([
    (0, common_1.Get)('get-stripe-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "getStripePaymentSettings", null);
__decorate([
    (0, common_1.Post)('update-razorpay-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [razorpay_payment_settings_dto_1.RazorpayPaymentSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "updateRazorpaySettings", null);
__decorate([
    (0, common_1.Get)('get-razorpay-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "getRazorpayPaymentSettings", null);
__decorate([
    (0, common_1.Post)('update-paystack-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paystack_payment_settings_dto_1.PaystackPaymentSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "updatePaystackSettings", null);
__decorate([
    (0, common_1.Get)('get-paystack-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "getPaystackPaymentSettings", null);
__decorate([
    (0, common_1.Post)('update-braintree-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [braintree_payment_settings_dto_1.UpdateBraintreeSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "updateBrainTreePaymentSettings", null);
__decorate([
    (0, common_1.Get)('get-braintree-payment-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "getBraintreePaymentSettings", null);
AdminPaymentController = __decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Controller)('admin-payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], AdminPaymentController);
exports.AdminPaymentController = AdminPaymentController;
//# sourceMappingURL=admin-payment.controller.js.map