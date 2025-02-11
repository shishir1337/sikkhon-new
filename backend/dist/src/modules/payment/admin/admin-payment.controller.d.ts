import { PaymentService } from '../payment.service';
import { UpdatePaymentMethodStripeSettingsDto } from './dto/stripe-payment-settings.dto';
import { RazorpayPaymentSettingsDto } from './dto/razorpay-payment-settings.dto';
import { PaystackPaymentSettingsDto } from './dto/paystack-payment-settings.dto';
import { UpdateBraintreeSettingsDto } from './dto/braintree-payment-settings.dto';
export declare class AdminPaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    updateStripePaymentSettings(payload: UpdatePaymentMethodStripeSettingsDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getStripePaymentSettings(): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateRazorpaySettings(payload: RazorpayPaymentSettingsDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getRazorpayPaymentSettings(): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updatePaystackSettings(payload: PaystackPaymentSettingsDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getPaystackPaymentSettings(): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateBrainTreePaymentSettings(payload: UpdateBraintreeSettingsDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBraintreePaymentSettings(): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
