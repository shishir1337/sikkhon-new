"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const array_constants_1 = require("../../shared/constants/array.constants");
let PaymentService = class PaymentService {
    async updatePaymentStripeSettings(payload) {
        try {
            const keyValuePairs = Object.keys(payload).map((key) => ({
                key,
                value: payload[key],
            }));
            await Promise.all(keyValuePairs.map(async (element) => {
                await (0, functions_1.updateOrCreateAdminSettings)(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodStripeSettingsSlugs);
            return (0, functions_1.successResponse)('Stripe payment method settings is updated successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getStripePaymentSettings() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodStripeSettingsSlugs);
            return (0, functions_1.successResponse)('Stripe payment method settings data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateRazorpaySettings(payload) {
        try {
            const keyValuePairs = Object.keys(payload).map((key) => ({
                key,
                value: payload[key],
            }));
            await Promise.all(keyValuePairs.map(async (element) => {
                await (0, functions_1.updateOrCreateAdminSettings)(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodRazoarpaySettingsSlugs);
            return (0, functions_1.successResponse)('Razoarpay payment method settings is updated successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getRazorpayPaymentSettings() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodRazoarpaySettingsSlugs);
            return (0, functions_1.successResponse)('Razoarpay payment method settings data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updatePaystackSettings(payload) {
        try {
            const keyValuePairs = Object.keys(payload).map((key) => ({
                key,
                value: payload[key],
            }));
            await Promise.all(keyValuePairs.map(async (element) => {
                await (0, functions_1.updateOrCreateAdminSettings)(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodPaystackSettingsSlugs);
            return (0, functions_1.successResponse)('Paystack payment method settings is updated successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getPaystackPaymentSettings() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodPaystackSettingsSlugs);
            return (0, functions_1.successResponse)('Paystack payment method settings data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateBrainTreePaymentSettings(payload) {
        try {
            const keyValuePairs = Object.keys(payload).map((key) => ({
                key,
                value: payload[key],
            }));
            await Promise.all(keyValuePairs.map(async (element) => {
                await (0, functions_1.updateOrCreateAdminSettings)(element.key, element.value);
            }));
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodBraintreeSettingsSlugs);
            return (0, functions_1.successResponse)('Braintree payment method settings is updated successfully!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getBraintreePaymentSettings() {
        try {
            const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodBraintreeSettingsSlugs);
            return (0, functions_1.successResponse)('Braintree payment method settings data!', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map