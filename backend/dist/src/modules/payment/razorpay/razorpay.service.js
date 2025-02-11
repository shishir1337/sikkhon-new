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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayPaymentService = void 0;
const common_1 = require("@nestjs/common");
const razorpay_1 = __importDefault(require("razorpay"));
const array_constants_1 = require("../../../shared/constants/array.constants");
const coreConstant_1 = require("../../../shared/helpers/coreConstant");
const functions_1 = require("../../../shared/helpers/functions");
let RazorpayPaymentService = class RazorpayPaymentService {
    constructor() { }
    async init() {
        const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodRazoarpaySettingsSlugs);
        if (!data.payment_razorpay_key_id && !data.payment_razorpay_key_secret) {
            return;
        }
        this.razorpay = new razorpay_1.default({
            key_id: data.payment_razorpay_key_id,
            key_secret: data.payment_razorpay_key_secret,
        });
    }
    async createOrder(amount, currency) {
        const options = {
            amount,
            currency,
            payment_capture: 1,
        };
        try {
            const order = await this.razorpay.orders.create(options);
            return order;
        }
        catch (error) {
            throw new Error('Error creating Razorpay order');
        }
    }
    async capturePayment(orderId, amount, currency) {
        try {
            const payment = await this.razorpay.payments.capture(orderId, amount, currency);
            return payment;
        }
        catch (error) {
            throw new Error('Error capturing payment');
        }
    }
    async retrieveOrder(orderId) {
        const order = await this.razorpay.orders.fetch(orderId);
        return order;
    }
    async verifyPayment(orderId) {
        try {
            const payment = await this.retrieveOrder(orderId);
            if (payment && payment.status === 'captured') {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error verifying payment:', error);
            return false;
        }
    }
};
RazorpayPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RazorpayPaymentService);
exports.RazorpayPaymentService = RazorpayPaymentService;
//# sourceMappingURL=razorpay.service.js.map