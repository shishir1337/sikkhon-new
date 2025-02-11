"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BraintreePaymentService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../../shared/helpers/functions");
const array_constants_1 = require("../../../shared/constants/array.constants");
const braintree = __importStar(require("braintree"));
const coreConstant_1 = require("../../../shared/helpers/coreConstant");
const response_model_1 = require("../../../shared/models/response.model");
let BraintreePaymentService = class BraintreePaymentService {
    constructor() {
    }
    async initializeBraintree() {
        const data = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodBraintreeSettingsSlugs);
        let braintree_public_key = data.braintree_public_key;
        let braintree_merchant_id = data.braintree_merchant_id;
        let braintree_private_key = data.braintree_private_key;
        let environment = data.braintree_mode === coreConstant_1.modeStatusConstant.LIVE
            ? braintree.Environment.Sandbox
            : braintree.Environment.Sandbox;
        this.gateway = new braintree.BraintreeGateway({
            environment: environment,
            merchantId: braintree_merchant_id,
            publicKey: braintree_public_key,
            privateKey: braintree_private_key,
        });
    }
    async getClientToken() {
        try {
            await this.initializeBraintree();
            if (!this.gateway) {
                return (0, functions_1.errorResponse)('Braintree gateway is not initialized.');
            }
            const { clientToken } = await this.gateway.clientToken.generate({});
            return (0, functions_1.successResponse)('Braintree payment client token', clientToken);
        }
        catch (error) {
            return (0, functions_1.errorResponse)('Braintree Error to create client token');
        }
    }
    async createTransaction(amount, paymentMethodNonce) {
        try {
            await this.initializeBraintree();
            if (!this.gateway) {
                throw new common_1.NotFoundException('Braintree gateway is not initialized. Call init() first.');
            }
            new Promise((resolve, reject) => {
                this.gateway.transaction.sale({
                    amount: amount.toFixed(2),
                    paymentMethodNonce,
                    options: { submitForSettlement: true },
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result.transaction);
                    }
                });
            });
            return (0, functions_1.successResponse)('Braintree transaction successful');
        }
        catch (error) {
            console.log(error, 'Sssssssss');
            (0, functions_1.processException)(error);
        }
    }
};
BraintreePaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BraintreePaymentService);
exports.BraintreePaymentService = BraintreePaymentService;
//# sourceMappingURL=braintree.service.js.map