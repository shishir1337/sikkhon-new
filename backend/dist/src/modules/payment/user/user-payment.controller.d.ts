import { RazorpayPaymentService } from '../razorpay/razorpay.service';
import { PayStackService } from '../paystack/paystack.service';
import { BraintreePaymentService } from '../braintree/braintree.service';
export declare class UserPaymentController {
    private readonly razorpayPaymentService;
    private readonly paystackPaymentService;
    private readonly braintreePaymentService;
    constructor(razorpayPaymentService: RazorpayPaymentService, paystackPaymentService: PayStackService, braintreePaymentService: BraintreePaymentService);
    createRazorpayPaymentOrder(payload: any): Promise<import("razorpay/dist/types/orders").Orders.RazorpayOrder>;
    verifyRazorpayPayment(payload: any): Promise<boolean>;
    createPaystackInitiatePayment(payload: any): Promise<any>;
    verifyPaystackPayment(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    createBraintreePaymentClientToken(): Promise<import("../../../shared/models/response.model").ResponseModel>;
    processBraintreePaymentTransaction(payload: any): Promise<braintree.Transaction>;
}
