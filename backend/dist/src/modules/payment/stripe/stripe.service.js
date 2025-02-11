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
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = __importDefault(require("stripe"));
const functions_1 = require("../../../shared/helpers/functions");
const array_constants_1 = require("../../../shared/constants/array.constants");
let StripeService = class StripeService {
    constructor() { }
    async init() {
        const response = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodStripeSettingsSlugs);
        this.stripe = new stripe_1.default(response === null || response === void 0 ? void 0 : response.pm_stripe_secret_key_live, {
            apiVersion: '2023-08-16',
        });
    }
    async createStripePaymentIntent(amount, currency = 'USD') {
        if (!this.stripe) {
            throw new Error('Stripe is not initialized');
            return;
        }
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount,
            currency: currency,
        });
        return paymentIntent;
    }
    async verifyPaymentIntent(paymentIntentId) {
        if (!this.stripe) {
            return;
        }
        const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            return paymentIntent;
        }
        else {
            throw new Error('Payment not successful');
        }
    }
};
StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StripeService);
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map