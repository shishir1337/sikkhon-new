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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponAdminController = void 0;
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("../coupon.service");
const coupon_store_dto_1 = require("./dto/coupon-store.dto");
let CouponAdminController = class CouponAdminController {
    constructor(couponService) {
        this.couponService = couponService;
    }
    addNewCoupon(payload) {
        return this.couponService.addNewCoupon(payload);
    }
    getCouponList(payload) {
        return this.couponService.getCouponListByFilterPaginate(payload);
    }
    getCouponDetails(id) {
        return this.couponService.getCouponDetails(id);
    }
    updateCoupon(id, payload) {
        return this.couponService.updateCoupon(id, payload);
    }
    deleteCoupon(id) {
        return this.couponService.deleteCoupon(id);
    }
};
__decorate([
    (0, common_1.Post)('add-new-coupon'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_store_dto_1.CouponStoreDto]),
    __metadata("design:returntype", void 0)
], CouponAdminController.prototype, "addNewCoupon", null);
__decorate([
    (0, common_1.Get)('get-coupon-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CouponAdminController.prototype, "getCouponList", null);
__decorate([
    (0, common_1.Get)('get-coupon-details-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CouponAdminController.prototype, "getCouponDetails", null);
__decorate([
    (0, common_1.Put)('update-coupon-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, coupon_store_dto_1.CouponStoreDto]),
    __metadata("design:returntype", void 0)
], CouponAdminController.prototype, "updateCoupon", null);
__decorate([
    (0, common_1.Delete)('delete-coupon-:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CouponAdminController.prototype, "deleteCoupon", null);
CouponAdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponAdminController);
exports.CouponAdminController = CouponAdminController;
//# sourceMappingURL=admin.controller.js.map