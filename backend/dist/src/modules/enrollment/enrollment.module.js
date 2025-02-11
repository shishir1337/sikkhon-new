"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentModule = void 0;
const common_1 = require("@nestjs/common");
const enrollment_service_1 = require("./enrollment.service");
const enrollment_controller_1 = require("./user/enrollment.controller");
const coupon_service_1 = require("../coupon/coupon.service");
const enrollment_controller_2 = require("./admin/enrollment.controller");
const braintree_service_1 = require("../payment/braintree/braintree.service");
const razorpay_service_1 = require("../payment/razorpay/razorpay.service");
const paystack_service_1 = require("../payment/paystack/paystack.service");
let EnrollmentModule = class EnrollmentModule {
};
EnrollmentModule = __decorate([
    (0, common_1.Module)({
        controllers: [enrollment_controller_1.EnrollmentController, enrollment_controller_2.EnrollmentAdminController],
        providers: [
            enrollment_service_1.EnrollmentService,
            coupon_service_1.CouponService,
            braintree_service_1.BraintreePaymentService,
            razorpay_service_1.RazorpayPaymentService,
            paystack_service_1.PayStackService,
        ],
    })
], EnrollmentModule);
exports.EnrollmentModule = EnrollmentModule;
//# sourceMappingURL=enrollment.module.js.map