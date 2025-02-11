import { UpdatePaymentMethodStripeSettingsDto } from './admin/dto/stripe-payment-settings.dto';
import { RazorpayPaymentSettingsDto } from './admin/dto/razorpay-payment-settings.dto';
import { PaystackPaymentSettingsDto } from './admin/dto/paystack-payment-settings.dto';
import { UpdateBraintreeSettingsDto } from './admin/dto/braintree-payment-settings.dto';
export declare class PaymentService {
    updatePaymentStripeSettings(payload: UpdatePaymentMethodStripeSettingsDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getStripePaymentSettings(): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateRazorpaySettings(payload: RazorpayPaymentSettingsDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getRazorpayPaymentSettings(): Promise<import("../../shared/models/response.model").ResponseModel>;
    updatePaystackSettings(payload: PaystackPaymentSettingsDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getPaystackPaymentSettings(): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateBrainTreePaymentSettings(payload: UpdateBraintreeSettingsDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getBraintreePaymentSettings(): Promise<import("../../shared/models/response.model").ResponseModel>;
}
