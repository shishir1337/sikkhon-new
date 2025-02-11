import { CouponStoreDto } from './admin/dto/coupon-store.dto';
interface CouponValidationResult {
    isValid: boolean;
    totalOriginalPrice?: number;
    discountedPrice?: number;
    discountAmount?: number;
}
export declare class CouponService {
    addNewCoupon(payload: CouponStoreDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getCouponListByFilterPaginate(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getCouponDetails(id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateCoupon(id: number, payload: CouponStoreDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    deleteCoupon(id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    processCouponValidation(code: any, userId: number, totalAmount: number): Promise<CouponValidationResult>;
}
export {};
