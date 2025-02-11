import { ResponseModel } from 'src/shared/models/response.model';
import { User } from '@prisma/client';
import { CouponService } from '../coupon/coupon.service';
import { StripeService } from '../payment/stripe/stripe.service';
import { BraintreePaymentService } from '../payment/braintree/braintree.service';
import { RazorpayPaymentService } from '../payment/razorpay/razorpay.service';
import { PayStackService } from '../payment/paystack/paystack.service';
export declare class EnrollmentService {
    private readonly couponService;
    private readonly braintreePaymentService;
    private readonly razorpayPaymentService;
    private readonly paystackService;
    constructor(couponService: CouponService, braintreePaymentService: BraintreePaymentService, razorpayPaymentService: RazorpayPaymentService, paystackService: PayStackService);
    stripe: StripeService;
    enroll(promo_code: string | null, user: User): Promise<ResponseModel>;
    processEnrollmentWithCoupon(promo_code: string | null, user: User): Promise<any>;
    addToCart(course_id: number, user: User): Promise<ResponseModel>;
    removeFromCart(course_id: number, user: User): Promise<any>;
    myCartDetails(user: User): Promise<ResponseModel>;
    getCartDetails(user: User): Promise<{
        totalPrice: number;
        productsList: any[];
    }>;
    createStripePaymentIntent(amount: number): Promise<ResponseModel>;
    verifyPaymentIntent(paymentIntentId: string, promoCode: string | null, user: User): Promise<any>;
    processEnrollmentWithCouponAndCart(promoCode: string | null, user: User): Promise<ResponseModel>;
    validateCoupon(promo_code: string, user: User, total_amount: number): Promise<ResponseModel>;
    getCourseTransactionReport(payload: any): Promise<ResponseModel>;
    createBraintreeClientToken(): Promise<ResponseModel>;
    processBraintreePaymentTransaction(amount: number, paymentMethodNonce: string, promoCode: string, user: User): Promise<ResponseModel>;
    razorpayCreateOrder(amount: any, user: any): Promise<ResponseModel>;
    razorpaycapturePayment(orderId: any, user: User, promoCode: any): Promise<ResponseModel>;
    payStackCreatePayment(amount: any, user: User): Promise<ResponseModel>;
}
