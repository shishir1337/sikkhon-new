"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayStackService = void 0;
const axios_1 = __importDefault(require("axios"));
const common_1 = require("@nestjs/common");
const array_constants_1 = require("../../../shared/constants/array.constants");
const functions_1 = require("../../../shared/helpers/functions");
const coreConstant_1 = require("../../../shared/helpers/coreConstant");
let PayStackService = class PayStackService {
    constructor() {
        this.payStackApiUrl = 'https://api.paystack.co';
    }
    async getBalance() {
        const url = `${this.payStackApiUrl}/balance`;
        return axios_1.default.get(url);
    }
    async verifyPayment(reference) {
        try {
            const credential = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodPaystackSettingsSlugs);
            const key_secret = credential.payment_paystack_public_key;
            const headers = {
                Authorization: `Bearer ${key_secret}`,
                'Content-Type': 'application/json',
            };
            const url = `${this.payStackApiUrl}/transaction/verify/${reference}`;
            const response = await axios_1.default.get(url, { headers });
            return (0, functions_1.successResponse)('Paystack payment verification successful', response === null || response === void 0 ? void 0 : response.data);
        }
        catch (error) {
            return (0, functions_1.errorResponse)('invalid referance!');
        }
    }
    async initiatePayment(amount, email, reference, type) {
        try {
            const credential = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodPaystackSettingsSlugs);
            const key_secret = credential.payment_paystack_key_secret;
            const url = `${this.payStackApiUrl}/transaction/initialize`;
            const data = {
                amount,
                email,
                reference: `${Math.floor(Math.random() * 1000000000 + 1)}_${type}_${reference}`,
                callback_url: credential.redirect_url
                    ? credential.redirect_url
                    : 'http://localhost:3004/upgrade',
            };
            const headers = {
                Authorization: `Bearer ${key_secret}`,
                'Content-Type': 'application/json',
            };
            const response = await axios_1.default.post(url, data, { headers });
            return (0, functions_1.successResponse)('Paystack payment initiated successfully!', response.data);
        }
        catch (error) {
            return (0, functions_1.errorResponse)('Error initiating payment for Razorpay:', error);
        }
    }
};
PayStackService = __decorate([
    (0, common_1.Injectable)()
], PayStackService);
exports.PayStackService = PayStackService;
//# sourceMappingURL=paystack.service.js.map