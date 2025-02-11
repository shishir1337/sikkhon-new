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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../../shared/constants/types");
const functions_1 = require("../../shared/helpers/functions");
const response_model_1 = require("../../shared/models/response.model");
let ReviewService = class ReviewService {
    constructor() { }
    async createReview(user, createReviewDto) {
        try {
            const existsCourse = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: createReviewDto.course_id,
                },
            });
            if (!existsCourse) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const existsCourseEnrollment = await functions_1.PrismaClient.courseEnrollment.findFirst({
                where: {
                    user_id: user.id,
                    course_id: createReviewDto.course_id,
                },
            });
            if (!existsCourseEnrollment) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const existsReview = await functions_1.PrismaClient.review.findFirst({
                where: {
                    userId: user.id,
                    course_id: createReviewDto.course_id,
                },
            });
            if (existsReview) {
                return (0, functions_1.errorResponse)('You already gave a review to this course!');
            }
            const review = await functions_1.PrismaClient.review.create({
                data: {
                    content: createReviewDto.content,
                    rating: createReviewDto.rating,
                    course_id: createReviewDto.course_id,
                    userId: user.id,
                },
            });
            return (0, functions_1.successResponse)('Review is created successfully', review);
        }
        catch (error) {
            return (0, functions_1.errorResponse)('Failed to create review');
        }
    }
    async getCourseReviewListForInstructor(user, course_id, payload) {
        try {
            const myCourse = await functions_1.PrismaClient.course.findFirst({
                where: {
                    id: course_id,
                    instructorId: user.id,
                },
            });
            if (!myCourse) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = Object.assign({ course_id: myCourse.id }, (payload.search
                ? {
                    OR: [
                        ...(payload.search
                            ? [
                                {
                                    content: {
                                        contains: payload.search,
                                    },
                                },
                            ]
                            : []),
                        ...(payload.rating
                            ? [
                                {
                                    rating: {
                                        in: Number(payload.rating),
                                    },
                                },
                            ]
                            : []),
                    ],
                }
                : {}));
            const where = {
                where: whereCondition,
            };
            let sortBy = {
                orderBy: {},
            };
            if (payload.sort_by) {
                if (payload.sort_by === 'rating_high_to_low') {
                    sortBy.orderBy = { rating: 'desc' };
                }
                else if (payload.sort_by === 'rating_low_to_high') {
                    sortBy.orderBy = { rating: 'desc' };
                }
            }
            else {
                sortBy.orderBy = { created_at: 'desc' };
            }
            const reviewList = await functions_1.PrismaClient.review.findMany(Object.assign(Object.assign(Object.assign({}, where), sortBy), paginate));
            const data = {
                list: reviewList,
                meta: await (0, functions_1.paginationMetaData)('review', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Course review list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getReviewsByUserId(userId) {
        try {
            const reviews = await functions_1.PrismaClient.review.findMany({
                where: {
                    userId,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            return (0, functions_1.successResponse)('Reviews fetched successfully', reviews);
        }
        catch (error) {
            return (0, functions_1.errorResponse)('Failed to fetch reviews');
        }
    }
    async getReviewsAdmin(payload) {
        try {
            const search = payload.search ? payload.search : '';
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = {
                OR: [
                    {
                        content: {
                            contains: search,
                        },
                    },
                ],
            };
            const reviews = await functions_1.PrismaClient.review.findMany(Object.assign({ where: whereCondition, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            const paginationMeta = await (0, functions_1.paginationMetaData)('category', payload, whereCondition);
            const data = {
                list: reviews,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Review fetched successfully', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async editReview(editReviewDto) {
        try {
            const updatedReview = await functions_1.PrismaClient.review.update({
                where: { id: editReviewDto.reviewId },
                data: editReviewDto,
            });
            return (0, functions_1.successResponse)('Review updated successfully', updatedReview);
        }
        catch (error) {
            return (0, functions_1.errorResponse)('Failed to update review');
        }
    }
    async deleteReview(reviewId) {
        try {
            await functions_1.PrismaClient.review.delete({
                where: { id: reviewId },
            });
            return (0, functions_1.successResponse)('Review deleted successfully');
        }
        catch (error) {
            return (0, functions_1.errorResponse)('Failed to delete review');
        }
    }
    async getReviewListForLandingPage(take = 4) {
        try {
            const reviewList = await functions_1.PrismaClient.review.findMany({
                include: {
                    user: true,
                },
                orderBy: {
                    created_at: 'desc',
                },
                take: take,
            });
            reviewList.map((review) => {
                delete review.User.password;
                review.User.photo = (0, functions_1.addPhotoPrefix)(review.User.photo);
                return review;
            });
            return (0, functions_1.successResponse)('Review List for landing page!', reviewList);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map