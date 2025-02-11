import { paginateInterface } from 'src/shared/constants/types';
import { ResponseModel } from 'src/shared/models/response.model';
import { CreateReviewDto } from './admin/dto/create.dto';
import { User } from '@prisma/client';
import { EditReviewDto } from './admin/dto/edit.dto';
export declare class ReviewService {
    constructor();
    createReview(user: User, createReviewDto: CreateReviewDto): Promise<ResponseModel>;
    getCourseReviewListForInstructor(user: User, course_id: number, payload: any): Promise<ResponseModel>;
    getReviewsByUserId(userId: number): Promise<ResponseModel>;
    getReviewsAdmin(payload: paginateInterface): Promise<ResponseModel>;
    editReview(editReviewDto: EditReviewDto): Promise<ResponseModel>;
    deleteReview(reviewId: number): Promise<ResponseModel>;
    getReviewListForLandingPage(take?: number): Promise<ResponseModel>;
}
