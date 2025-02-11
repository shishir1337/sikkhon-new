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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentController = void 0;
const common_1 = require("@nestjs/common");
const enrollment_service_1 = require("../enrollment.service");
const create_enrollment_dto_1 = require("./dto/create-enrollment.dto");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const client_1 = require("@prisma/client");
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
const response_model_1 = require("../../../shared/models/response.model");
const create_intent_dto_1 = require("./dto/create-intent.dto");
const validate_coupon_dto_1 = require("./dto/validate-coupon.dto");
let EnrollmentController = class EnrollmentController {
    constructor(enrollmentService) {
        this.enrollmentService = enrollmentService;
    }
    createStripePaymentIntent(payload) {
        return this.enrollmentService.createStripePaymentIntent(payload.amount);
    }
    verifyPaymentIntent(payload, user) {
        return this.enrollmentService.verifyPaymentIntent(payload.payment_intent_id, payload.promo_code, user);
    }
    async enroll(createEnrollmentDto, user) {
        return await this.enrollmentService.enroll(createEnrollmentDto.promo_code, user);
    }
    async myCartDetails(user) {
        return await this.enrollmentService.myCartDetails(user);
    }
    async addToCart(addToCartDto, user) {
        return await this.enrollmentService.addToCart(addToCartDto.course_id, user);
    }
    async removeFromCart(course_id, user) {
        return await this.enrollmentService.removeFromCart(course_id, user);
    }
    async validateCoupon(validateCouponDto, user) {
        return await this.enrollmentService.validateCoupon(validateCouponDto.promo_code, user, validateCouponDto.total_amount);
    }
    createBraintreeClientToken() {
        return this.enrollmentService.createBraintreeClientToken();
    }
    processBraintreePaymentTransaction(amount, payment_method_nonce, user, promoCode) {
        return this.enrollmentService.processBraintreePaymentTransaction(amount, payment_method_nonce, promoCode, user);
    }
    razorpayCreateOrder(amount, user) {
        return this.enrollmentService.razorpayCreateOrder(amount, user);
    }
    capturePayment(user, promoCode, orderId) {
        return this.enrollmentService.razorpaycapturePayment(orderId, user, promoCode);
    }
    payStackCreatePayment(amount, user) {
        return this.enrollmentService.payStackCreatePayment(amount, user);
    }
};
__decorate([
    (0, common_1.Post)('create-stripe-intent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_intent_dto_1.createIntentDto]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "createStripePaymentIntent", null);
__decorate([
    (0, common_1.Post)('confirm-and-verify-stripe-payment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "verifyPaymentIntent", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_enrollment_dto_1.CreateEnrollmentDto, typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "enroll", null);
__decorate([
    (0, common_1.Get)('my-cart-details'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "myCartDetails", null);
__decorate([
    (0, common_1.Post)('add-to-cart'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_to_cart_dto_1.AddToCartDto, typeof (_d = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Delete)('remove-from-cart/:course_id'),
    __param(0, (0, common_1.Param)('course_id')),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Post)('validate-coupon'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_coupon_dto_1.validateCouponDto, typeof (_f = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "validateCoupon", null);
__decorate([
    (0, common_1.Get)('create-braintree-client-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "createBraintreeClientToken", null);
__decorate([
    (0, common_1.Post)('confirm-and-verify-braintree-payment'),
    __param(0, (0, common_1.Body)('amount')),
    __param(1, (0, common_1.Body)('payment_method_nonce')),
    __param(2, (0, user_decorators_1.UserInfo)()),
    __param(3, (0, common_1.Body)('promoCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, typeof (_g = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _g : Object, String]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "processBraintreePaymentTransaction", null);
__decorate([
    (0, common_1.Post)('razorpay-create-order'),
    __param(0, (0, common_1.Body)('amount')),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_h = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "razorpayCreateOrder", null);
__decorate([
    (0, common_1.Post)('razorpay-capture-subscribe'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)('promoCode')),
    __param(2, (0, common_1.Body)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _j : Object, String, String]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "capturePayment", null);
__decorate([
    (0, common_1.Post)('paystack-create-payment'),
    __param(0, (0, common_1.Body)('amount')),
    __param(1, (0, user_decorators_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_k = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "payStackCreatePayment", null);
EnrollmentController = __decorate([
    (0, common_1.Controller)('enroll'),
    __metadata("design:paramtypes", [enrollment_service_1.EnrollmentService])
], EnrollmentController);
exports.EnrollmentController = EnrollmentController;
//# sourceMappingURL=enrollment.controller.js.map