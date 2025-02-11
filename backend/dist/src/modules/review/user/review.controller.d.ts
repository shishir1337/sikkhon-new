import { CreateReviewDto } from '../admin/dto/create.dto';
import { User } from '@prisma/client';
import { ResponseModel } from 'src/shared/models/response.model';
import { ReviewService } from '../review.service';
export declare class UserReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    createReview(user: User, createReviewDto: CreateReviewDto): Promise<ResponseModel>;
    getCourseReviewListForInstructor(user: User, course_id: number, payload: any): Promise<ResponseModel>;
}
