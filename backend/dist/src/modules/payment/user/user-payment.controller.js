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
exports.UserPaymentController = void 0;
const common_1 = require("@nestjs/common");
const razorpay_service_1 = require("../razorpay/razorpay.service");
const paystack_service_1 = require("../paystack/paystack.service");
const braintree_service_1 = require("../braintree/braintree.service");
let UserPaymentController = class UserPaymentController {
    constructor(razorpayPaymentService, paystackPaymentService, braintreePaymentService) {
        this.razorpayPaymentService = razorpayPaymentService;
        this.paystackPaymentService = paystackPaymentService;
        this.braintreePaymentService = braintreePaymentService;
    }
    createRazorpayPaymentOrder(payload) {
        return this.razorpayPaymentService.createOrder(payload.amount, 'USD');
    }
    verifyRazorpayPayment(payload) {
        return this.razorpayPaymentService.verifyPayment(payload.order_id);
    }
    createPaystackInitiatePayment(payload) {
        return this.paystackPaymentService.initiatePayment(payload.amount, payload.email, payload.package_id, payload.type);
    }
    verifyPaystackPayment(payload) {
        return this.paystackPaymentService.verifyPayment(payload.referance);
    }
    createBraintreePaymentClientToken() {
        return this.braintreePaymentService.getClientToken();
    }
    processBraintreePaymentTransaction(payload) {
        return this.braintreePaymentService.createTransaction(payload.amount, payload.payment_method_nonce);
    }
};
__decorate([
    (0, common_1.Post)('create-razorpay-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserPaymentController.prototype, "createRazorpayPaymentOrder", null);
__decorate([
    (0, common_1.Post)('verify-razorpay-payemnt'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserPaymentController.prototype, "verifyRazorpayPayment", null);
__decorate([
    (0, common_1.Post)('create-paystack-initiate-payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserPaymentController.prototype, "createPaystackInitiatePayment", null);
__decorate([
    (0, common_1.Post)('verify-paystack-payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserPaymentController.prototype, "verifyPaystackPayment", null);
__decorate([
    (0, common_1.Post)('create-braintree-payment-client-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserPaymentController.prototype, "createBraintreePaymentClientToken", null);
__decorate([
    (0, common_1.Post)('process-braintree-payment-transaction'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserPaymentController.prototype, "processBraintreePaymentTransaction", null);
UserPaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [razorpay_service_1.RazorpayPaymentService,
        paystack_service_1.PayStackService,
        braintree_service_1.BraintreePaymentService])
], UserPaymentController);
exports.UserPaymentController = UserPaymentController;
//# sourceMappingURL=user-payment.controller.js.map