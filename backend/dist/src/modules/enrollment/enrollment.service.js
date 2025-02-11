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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const response_model_1 = require("../../shared/models/response.model");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const coupon_service_1 = require("../coupon/coupon.service");
const stripe_service_1 = require("../payment/stripe/stripe.service");
const braintree_service_1 = require("../payment/braintree/braintree.service");
const array_constants_1 = require("../../shared/constants/array.constants");
const razorpay_service_1 = require("../payment/razorpay/razorpay.service");
const paystack_service_1 = require("../payment/paystack/paystack.service");
let EnrollmentService = class EnrollmentService {
    constructor(couponService, braintreePaymentService, razorpayPaymentService, paystackService) {
        this.couponService = couponService;
        this.braintreePaymentService = braintreePaymentService;
        this.razorpayPaymentService = razorpayPaymentService;
        this.paystackService = paystackService;
        this.stripe = new stripe_service_1.StripeService();
    }
    async enroll(promo_code, user) {
        try {
            const { discountAmount, promoCode, discountedPrice, payable_price, totalPrice, } = await this.processEnrollmentWithCoupon(promo_code, user);
            const { productsList } = await this.getCartDetails(user);
            console.log(discountAmount, promoCode, discountedPrice, payable_price, totalPrice, productsList.length);
            const CartEnrollment = await functions_1.PrismaClient.cartEnrollment.create({
                data: {
                    user_id: user.id,
                    original_price: totalPrice,
                    discounted_price: discountedPrice,
                    payable_price: payable_price,
                    payment_method: 2,
                    promotion_applied: promoCode ? promoCode : '',
                    payment_info: JSON.stringify({
                        discount_amount: discountAmount,
                        promo_code: promoCode,
                        payable_price: payable_price,
                        total_price: totalPrice,
                        discounted_price: discountedPrice,
                    }),
                    payment_status: coreConstant_1.PaymentStatusConstant.PAYMENT_NOT_INITIATED,
                },
            });
            if (!CartEnrollment) {
                return (0, functions_1.errorResponse)('Not able to create enrollment');
            }
            for (const product of productsList) {
                const newproduct = await functions_1.PrismaClient.courseEnrollment.create({
                    data: {
                        course_id: product.id,
                        cartEnrollmentId: CartEnrollment.id,
                        user_id: user.id,
                    },
                });
                console.log(newproduct.id, 'newproduct');
            }
            let cartUpdated = await functions_1.PrismaClient.cartItem.updateMany({
                where: {
                    userId: user.id,
                    isCart: true,
                },
                data: {
                    isCart: false,
                },
            });
            console.log(cartUpdated.count, 'cartUpdated');
            const cartEnrollment = await functions_1.PrismaClient.cartEnrollment.update({
                where: {
                    id: CartEnrollment.id,
                },
                data: {
                    payment_status: coreConstant_1.PaymentStatusConstant.PAYMENT_SUCCESS,
                },
            });
            console.log(cartEnrollment.id, 'cartEnrollment');
            return (0, functions_1.successResponse)('Enrolled Successfully!', productsList);
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async processEnrollmentWithCoupon(promo_code, user) {
        try {
            const { totalPrice, productsList } = await this.getCartDetails(user);
            let discountAmount = 0.0;
            let promoCode = '';
            let discountedPrice = 0.0;
            let payable_price = totalPrice;
            if (!productsList || productsList.length === 0) {
                return (0, functions_1.errorResponse)('No items in the cart.');
            }
            if (promo_code) {
                const couponResult = await this.couponService.processCouponValidation(promo_code, user.id, totalPrice);
                if (!couponResult.isValid) {
                    return (0, functions_1.errorResponse)('Coupon is invalid or cannot be applied.');
                }
                discountAmount = couponResult.discountAmount;
                promoCode = promo_code;
                discountedPrice = couponResult.discountedPrice;
                payable_price = couponResult.discountedPrice;
            }
            return {
                discountAmount,
                promoCode,
                discountedPrice,
                payable_price,
                totalPrice,
                productsList,
            };
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async addToCart(course_id, user) {
        try {
            const valid_course = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: course_id,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
            });
            if (!valid_course) {
                return (0, functions_1.errorResponse)(`Course id ${course_id} is invalid or inactive`);
            }
            const already_purchesed = await functions_1.PrismaClient.courseEnrollment.findFirst({
                where: {
                    course_id: course_id,
                    user_id: user.id,
                },
            });
            if (already_purchesed) {
                return (0, functions_1.errorResponse)('Course is already purched');
            }
            const existingCartItem = await functions_1.PrismaClient.cartItem.findFirst({
                where: {
                    courseId: course_id,
                    userId: user.id,
                },
            });
            if (existingCartItem) {
                return (0, functions_1.errorResponse)('Course is already in the cart');
            }
            const cart = await functions_1.PrismaClient.cartItem.create({
                data: {
                    courseId: course_id,
                    userId: user.id,
                },
            });
            if (!cart) {
                return (0, functions_1.errorResponse)('Product not added to cart!');
            }
            return (0, functions_1.successResponse)('Product Added to the cart.');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async removeFromCart(course_id, user) {
        try {
            const validCourse = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: Number(course_id),
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
            });
            if (!validCourse) {
                return (0, functions_1.errorResponse)(`Course id ${course_id} is invalid or inactive`);
            }
            const existingCartItem = await functions_1.PrismaClient.cartItem.findFirst({
                where: {
                    courseId: Number(course_id),
                    userId: user.id,
                },
            });
            if (!existingCartItem) {
                return (0, functions_1.errorResponse)('Course is not in the cart');
            }
            const removedCartItem = await functions_1.PrismaClient.cartItem.delete({
                where: {
                    id: existingCartItem.id,
                },
            });
            if (!removedCartItem) {
                return (0, functions_1.errorResponse)('Failed to remove course from the cart');
            }
            return (0, functions_1.successResponse)('Course removed from the cart successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async myCartDetails(user) {
        try {
            const { totalPrice, productsList } = await this.getCartDetails(user);
            if (!productsList.length) {
                return (0, functions_1.errorResponse)('No items in the cart.');
            }
            return (0, functions_1.successResponse)('Cart total calculated successfully.', {
                totalPrice,
                productsList,
            });
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCartDetails(user) {
        try {
            const cartItems = await functions_1.PrismaClient.cartItem.findMany({
                where: {
                    userId: user.id,
                    isCart: true,
                },
                include: {
                    course: {
                        include: {
                            User: true,
                        },
                    },
                },
            });
            if (!cartItems || cartItems.length === 0) {
                return { totalPrice: 0, productsList: [] };
            }
            let totalPrice = 0.0;
            const productsList = [];
            for (const cartItem of cartItems) {
                if (!cartItem.course) {
                    continue;
                }
                const coursePrice = Number(cartItem.course.payable_price) || 0.0;
                const lessons = await functions_1.PrismaClient.lesson.count({
                    where: {
                        course_id: cartItem.course.id,
                    },
                });
                if (Number(coursePrice) >= 0) {
                    totalPrice += coursePrice;
                    let localCourse = (0, functions_1.processCourseLinks)(cartItem.course);
                    localCourse.lessons = lessons;
                    productsList.push(localCourse);
                }
            }
            return { totalPrice, productsList };
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async createStripePaymentIntent(amount) {
        try {
            await this.stripe.init();
            const amountInCents = Math.round(amount * 100);
            const intent = await this.stripe.createStripePaymentIntent(amountInCents, 'USD');
            if (!intent) {
                return (0, functions_1.errorResponse)('Stripe payment intent cannot be created');
            }
            return (0, functions_1.successResponse)('Stripe payment intent created successfully', {
                intent: intent,
            });
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async verifyPaymentIntent(paymentIntentId, promoCode, user) {
        try {
            await this.stripe.init();
            const intent = await this.stripe.verifyPaymentIntent(paymentIntentId);
            if (!intent || intent.status !== 'succeeded') {
                return (0, functions_1.errorResponse)('Stripe payment intent could not be verified or has not succeeded');
            }
            return await this.processEnrollmentWithCouponAndCart(promoCode, user);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async processEnrollmentWithCouponAndCart(promoCode, user) {
        try {
            const { totalPrice, productsList } = await this.getCartDetails(user);
            if (!productsList || productsList.length === 0) {
                return (0, functions_1.errorResponse)('No items in the cart.');
            }
            let discountAmount = 0.0;
            let promoCodeValue = '';
            let discountedPrice = 0.0;
            let payablePrice = totalPrice;
            if (promoCode) {
                const couponResult = await this.couponService.processCouponValidation(promoCode, user.id, totalPrice);
                if (!couponResult.isValid) {
                    return (0, functions_1.errorResponse)('Coupon is invalid or cannot be applied.');
                }
                discountAmount = couponResult.discountAmount;
                promoCodeValue = promoCode;
                discountedPrice = couponResult.discountedPrice;
                payablePrice = couponResult.discountedPrice;
            }
            const CartEnrollment = await functions_1.PrismaClient.cartEnrollment.create({
                data: {
                    user_id: user.id,
                    original_price: totalPrice,
                    discounted_price: discountedPrice,
                    payable_price: payablePrice,
                    payment_method: 2,
                    promotion_applied: promoCodeValue,
                    payment_info: JSON.stringify({
                        discount_amount: discountAmount,
                        promo_code: promoCodeValue,
                        payable_price: payablePrice,
                        total_price: totalPrice,
                        discounted_price: discountedPrice,
                    }),
                    payment_status: coreConstant_1.PaymentStatusConstant.PAYMENT_NOT_INITIATED,
                },
            });
            if (!CartEnrollment) {
                return (0, functions_1.errorResponse)('Not able to create enrollment');
            }
            let instructorIds = [];
            for (const product of productsList) {
                await functions_1.PrismaClient.courseEnrollment.create({
                    data: {
                        course_id: product.id,
                        cartEnrollmentId: CartEnrollment.id,
                        user_id: user.id,
                    },
                });
                instructorIds.push(product.instructorId);
            }
            await functions_1.PrismaClient.cartItem.updateMany({
                where: {
                    userId: user.id,
                    isCart: true,
                },
                data: {
                    isCart: false,
                },
            });
            await functions_1.PrismaClient.cartEnrollment.update({
                where: {
                    id: CartEnrollment.id,
                },
                data: {
                    payment_status: coreConstant_1.PaymentStatusConstant.PAYMENT_SUCCESS,
                },
            });
            const adminUserDetails = await functions_1.PrismaClient.user.findFirst({
                where: {
                    roles: {
                        contains: '2',
                    },
                },
            });
            const checkAdminWallet = await functions_1.PrismaClient.wallet.findFirst({
                where: {
                    userId: adminUserDetails.id,
                    is_admin_wallet: true,
                },
            });
            if (checkAdminWallet) {
                await functions_1.PrismaClient.wallet.update({
                    where: {
                        id: checkAdminWallet.id,
                    },
                    data: {
                        balance: {
                            increment: payablePrice,
                        },
                    },
                });
            }
            else {
                await functions_1.PrismaClient.wallet.create({
                    data: {
                        userId: adminUserDetails.id,
                        balance: payablePrice,
                        is_admin_wallet: true,
                    },
                });
            }
            for (let i = 0; i < instructorIds.length; i++) {
                const checkInstructorWallet = await functions_1.PrismaClient.wallet.findFirst({
                    where: {
                        userId: instructorIds[i],
                    },
                });
                if (checkInstructorWallet) {
                    await functions_1.PrismaClient.wallet.update({
                        where: {
                            id: checkInstructorWallet.id,
                        },
                        data: {
                            balance: {
                                increment: payablePrice,
                            },
                        },
                    });
                }
                else {
                    await functions_1.PrismaClient.wallet.create({
                        data: {
                            userId: instructorIds[i],
                            balance: payablePrice,
                        },
                    });
                }
            }
            return (0, functions_1.successResponse)('Enrolled Successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async validateCoupon(promo_code, user, total_amount) {
        try {
            const validationResult = await this.couponService.processCouponValidation(promo_code, user.id, total_amount);
            if (!validationResult.isValid) {
                return (0, functions_1.errorResponse)('Invalid coupon code or coupon is inactive!');
            }
            return (0, functions_1.successResponse)('Coupon is valid!', validationResult);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCourseTransactionReport(payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const transactionList = await functions_1.PrismaClient.cartEnrollment.findMany(Object.assign({ include: {
                    user: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            email: true,
                        },
                    },
                } }, paginate));
            const paginationMeta = await (0, functions_1.paginationMetaData)('cartEnrollment', payload);
            const data = {
                list: transactionList,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Transaction list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async createBraintreeClientToken() {
        try {
            const clientToken = await this.braintreePaymentService.getClientToken();
            return (0, functions_1.successResponse)('Braintree client token created successfully', {
                clientToken,
            });
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async processBraintreePaymentTransaction(amount, paymentMethodNonce, promoCode, user) {
        try {
            const transaction = await this.braintreePaymentService.createTransaction(amount, paymentMethodNonce);
            if (!transaction) {
                return (0, functions_1.errorResponse)('Purchase failed!');
            }
            return await this.processEnrollmentWithCouponAndCart(promoCode, user);
        }
        catch (error) {
            return (0, functions_1.errorResponse)('Braintree payment transaction processed successfully');
        }
    }
    async razorpayCreateOrder(amount, user) {
        try {
            const paymentData = await (0, functions_1.getAdminSettingsData)(array_constants_1.PaymentMethodRazoarpaySettingsSlugs);
            if (!paymentData.payment_razorpay_key_id &&
                !paymentData.payment_razorpay_key_secret) {
                return (0, functions_1.errorResponse)('Credential not provided for razorpay');
            }
            this.razorpayPaymentService.init();
            let amountLocal = Number(amount) * 100;
            const repsonse = await this.razorpayPaymentService.createOrder(amountLocal, 'USD');
            repsonse.key_id = paymentData.payment_razorpay_key_id;
            return (0, functions_1.successResponse)('Order created successfully', repsonse);
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async razorpaycapturePayment(orderId, user, promoCode) {
        try {
            const orderValid = this.razorpayPaymentService.verifyPayment(orderId);
            if (!orderValid) {
                return (0, functions_1.errorResponse)('Order id not valid');
            }
            return await this.processEnrollmentWithCouponAndCart(promoCode, user);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async payStackCreatePayment(amount, user) {
        try {
            const response = await this.paystackService.initiatePayment(amount, user.email, String(coreConstant_1.coreConstant.PAYMENT_METHODS.PAYSTACK), String(coreConstant_1.coreConstant.PAYMENT_METHODS.PAYSTACK));
            return (0, functions_1.successResponse)('Payment created successfully', response);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [coupon_service_1.CouponService,
        braintree_service_1.BraintreePaymentService,
        razorpay_service_1.RazorpayPaymentService,
        paystack_service_1.PayStackService])
], EnrollmentService);
exports.EnrollmentService = EnrollmentService;
//# sourceMappingURL=enrollment.service.js.map