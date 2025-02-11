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
exports.AdminReviewController = void 0;
const common_1 = require("@nestjs/common");
const edit_dto_1 = require("../admin/dto/edit.dto");
const response_model_1 = require("../../../shared/models/response.model");
const review_service_1 = require("../review.service");
const types_1 = require("../../../shared/constants/types");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
let AdminReviewController = class AdminReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async editReview(editReviewDto) {
        return this.reviewService.editReview(editReviewDto);
    }
    async deleteReview(reviewId) {
        return this.reviewService.deleteReview(reviewId);
    }
    async getReviewsAdmin(payload) {
        return this.reviewService.getReviewsAdmin(payload);
    }
};
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Put)('edit-review'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_dto_1.EditReviewDto]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "editReview", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Delete)('delete-review/:reviewId'),
    __param(0, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "deleteReview", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-reviews'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "getReviewsAdmin", null);
AdminReviewController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], AdminReviewController);
exports.AdminReviewController = AdminReviewController;
//# sourceMappingURL=review.controller.js.map