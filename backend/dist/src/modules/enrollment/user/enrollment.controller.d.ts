import { EnrollmentService } from '../enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { User } from '@prisma/client';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ResponseModel } from 'src/shared/models/response.model';
import { createIntentDto } from './dto/create-intent.dto';
import { validateCouponDto } from './dto/validate-coupon.dto';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    createStripePaymentIntent(payload: createIntentDto): Promise<ResponseModel>;
    verifyPaymentIntent(payload: {
        payment_intent_id: string;
        promo_code: string;
    }, user: User): Promise<ResponseModel>;
    enroll(createEnrollmentDto: CreateEnrollmentDto, user: User): Promise<ResponseModel>;
    myCartDetails(user: User): Promise<ResponseModel>;
    addToCart(addToCartDto: AddToCartDto, user: User): Promise<ResponseModel>;
    removeFromCart(course_id: number, user: User): Promise<ResponseModel>;
    validateCoupon(validateCouponDto: validateCouponDto, user: User): Promise<ResponseModel>;
    createBraintreeClientToken(): Promise<ResponseModel>;
    processBraintreePaymentTransaction(amount: number, payment_method_nonce: string, user: User, promoCode: string): Promise<ResponseModel>;
    razorpayCreateOrder(amount: number, user: User): Promise<ResponseModel>;
    capturePayment(user: User, promoCode: string, orderId: string): Promise<ResponseModel>;
    payStackCreatePayment(amount: number, user: User): Promise<ResponseModel>;
}
