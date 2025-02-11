import { CouponService } from '../coupon.service';
import { CouponStoreDto } from './dto/coupon-store.dto';
export declare class CouponAdminController {
    private readonly couponService;
    constructor(couponService: CouponService);
    addNewCoupon(payload: CouponStoreDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getCouponList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getCouponDetails(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateCoupon(id: number, payload: CouponStoreDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteCoupon(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
