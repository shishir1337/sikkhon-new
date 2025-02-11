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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReviewController = void 0;
const common_1 = require("@nestjs/common");
const create_dto_1 = require("../admin/dto/create.dto");
const client_1 = require("@prisma/client");
const response_model_1 = require("../../../shared/models/response.model");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const review_service_1 = require("../review.service");
const is_instructor_decorator_1 = require("../../../shared/decorators/is-instructor.decorator");
let UserReviewController = class UserReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async createReview(user, createReviewDto) {
        return this.reviewService.createReview(user, createReviewDto);
    }
    async getCourseReviewListForInstructor(user, course_id, payload) {
        return this.reviewService.getCourseReviewListForInstructor(user, course_id, payload);
    }
};
__decorate([
    (0, common_1.Post)('submit-review'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object, create_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], UserReviewController.prototype, "createReview", null);
__decorate([
    (0, is_instructor_decorator_1.IsInstructor)(),
    (0, common_1.Get)('course-review-list-:course_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('course_id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UserReviewController.prototype, "getCourseReviewListForInstructor", null);
UserReviewController = __decorate([
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], UserReviewController);
exports.UserReviewController = UserReviewController;
//# sourceMappingURL=review.controller.js.map