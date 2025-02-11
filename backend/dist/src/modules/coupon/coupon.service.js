"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let CouponService = class CouponService {
    async addNewCoupon(payload) {
        try {
            const existCouponCode = await functions_1.PrismaClient.coupon.findFirst({
                where: {
                    code: payload.code,
                },
            });
            if (existCouponCode) {
                return (0, functions_1.errorResponse)('This code is already exist!');
            }
            const startDate = new Date(payload.start_date);
            let endDate = null;
            if (payload.end_date) {
                endDate = new Date(payload.end_date);
                if (endDate < startDate) {
                    return (0, functions_1.errorResponse)('End date must not be a past date from start date!');
                }
            }
            if (payload.uses_type == coreConstant_1.CouponUsesTypeConstant.LIMITED_USER &&
                (!payload.uses_limit || payload.uses_limit == 0)) {
                return (0, functions_1.errorResponse)('Uses limit must be more than 0!');
            }
            const couponDetails = await functions_1.PrismaClient.coupon.create({
                data: {
                    title: payload.title,
                    code: payload.code,
                    discount_type: payload.discount_type,
                    discount_amount: payload.discount_amount,
                    start_date: startDate,
                    end_date: endDate,
                    minimum_purchase: payload.minimum_purchase,
                    uses_type: payload.uses_type,
                    uses_limit: payload.uses_limit,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Coupon is added successfully!', couponDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCouponListByFilterPaginate(payload) {
        try {
            const whereCondition = payload.search
                ? {
                    OR: [
                        {
                            title: {
                                contains: payload.search,
                            },
                        },
                        {
                            code: {
                                contains: payload.search,
                            },
                        },
                    ],
                }
                : {};
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const couponList = await functions_1.PrismaClient.coupon.findMany(Object.assign({ where: whereCondition }, paginate));
            const data = {
                list: couponList,
                meta: await (0, functions_1.paginationMetaData)('coupon', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Coupon list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCouponDetails(id) {
        try {
            const couponDetails = await functions_1.PrismaClient.coupon.findFirst({
                where: {
                    id: id,
                },
            });
            if (!couponDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            return (0, functions_1.successResponse)('Coupon details', couponDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateCoupon(id, payload) {
        try {
            const couponDetails = await functions_1.PrismaClient.coupon.findFirst({
                where: {
                    id: id,
                },
            });
            if (!couponDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const existCouponCode = await functions_1.PrismaClient.coupon.findFirst({
                where: {
                    code: payload.code,
                    NOT: {
                        id: id,
                    },
                },
            });
            if (existCouponCode) {
                return (0, functions_1.errorResponse)('This code is already exist!');
            }
            const startDate = new Date(payload.start_date);
            let endDate = null;
            if (payload.end_date) {
                endDate = new Date(payload.end_date);
                if (endDate < startDate) {
                    return (0, functions_1.errorResponse)('End date must not be a past date from start date!');
                }
            }
            if (payload.uses_type == coreConstant_1.CouponUsesTypeConstant.LIMITED_USER &&
                (!payload.uses_limit || payload.uses_limit == 0)) {
                return (0, functions_1.errorResponse)('Uses limit must be more than 0!');
            }
            const updateCoupon = await functions_1.PrismaClient.coupon.update({
                where: {
                    id: id,
                },
                data: {
                    title: payload.title,
                    code: payload.code,
                    discount_type: payload.discount_type,
                    discount_amount: payload.discount_amount,
                    start_date: startDate,
                    end_date: endDate,
                    minimum_purchase: payload.minimum_purchase,
                    uses_type: payload.uses_type,
                    uses_limit: payload.uses_limit,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Coupon is updated successfully!', updateCoupon);
        }
        catch (error) {
            {
                (0, functions_1.processException)(error);
            }
        }
    }
    async deleteCoupon(id) {
        try {
            const couponDetails = await functions_1.PrismaClient.coupon.findFirst({
                where: {
                    id: id,
                },
            });
            if (!couponDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            await functions_1.PrismaClient.coupon.delete({
                where: {
                    id: id,
                },
            });
            return (0, functions_1.successResponse)('Coupon is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async processCouponValidation(code, userId, totalAmount) {
        try {
            const coupon = await functions_1.PrismaClient.coupon.findFirst({
                where: {
                    code: code,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
            });
            if (!coupon || coupon.status !== coreConstant_1.coreConstant.STATUS_ACTIVE) {
                return { isValid: false };
            }
            const currentDate = new Date();
            if (coupon.start_date > currentDate ||
                (coupon.end_date && coupon.end_date < currentDate)) {
                return { isValid: false };
            }
            if (coupon.uses_type === coreConstant_1.CouponUsesTypeConstant.LIMITED_USER &&
                coupon.uses_limit !== null &&
                coupon.uses_limit <= 0) {
                return { isValid: false };
            }
            const userUsedCoupon = await functions_1.PrismaClient.cartEnrollment.findFirst({
                where: {
                    user_id: userId,
                    promotion_applied: coupon.code,
                },
            });
            if (userUsedCoupon) {
                return { isValid: false };
            }
            let totalOriginalPrice = totalAmount;
            let discountAmount = 0.0;
            let discountedPrice = totalAmount;
            if (coupon.discount_type === coreConstant_1.DiscountConstant.DISCOUNT_FIXED) {
                discountAmount = Number(coupon.discount_amount || 0.0);
                discountedPrice = Math.max(0, totalAmount - discountAmount);
            }
            else if (coupon.discount_type === coreConstant_1.DiscountConstant.DISCOUNT_PERCENTAGE) {
                const discountPercentage = Number(coupon.discount_amount || 0.0);
                discountAmount = (discountPercentage / 100) * totalAmount;
                discountedPrice = Math.max(0, totalAmount - discountAmount);
            }
            return {
                isValid: true,
                totalOriginalPrice,
                discountedPrice,
                discountAmount,
            };
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
CouponService = __decorate([
    (0, common_1.Injectable)()
], CouponService);
exports.CouponService = CouponService;
//# sourceMappingURL=coupon.service.js.map