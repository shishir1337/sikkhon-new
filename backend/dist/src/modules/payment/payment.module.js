"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const admin_payment_controller_1 = require("./admin/admin-payment.controller");
const user_payment_controller_1 = require("./user/user-payment.controller");
const stripe_service_1 = require("./stripe/stripe.service");
const paystack_service_1 = require("./paystack/paystack.service");
const razorpay_service_1 = require("./razorpay/razorpay.service");
const braintree_service_1 = require("./braintree/braintree.service");
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    (0, common_1.Module)({
        controllers: [admin_payment_controller_1.AdminPaymentController, user_payment_controller_1.UserPaymentController],
        providers: [
            payment_service_1.PaymentService,
            stripe_service_1.StripeService,
            paystack_service_1.PayStackService,
            razorpay_service_1.RazorpayPaymentService,
            braintree_service_1.BraintreePaymentService,
        ],
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;
//# sourceMappingURL=payment.module.js.map