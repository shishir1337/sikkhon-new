import { EditReviewDto } from '../admin/dto/edit.dto';
import { ResponseModel } from 'src/shared/models/response.model';
import { ReviewService } from '../review.service';
import { paginateInterface } from 'src/shared/constants/types';
export declare class AdminReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    editReview(editReviewDto: EditReviewDto): Promise<ResponseModel>;
    deleteReview(reviewId: number): Promise<ResponseModel>;
    getReviewsAdmin(payload: paginateInterface): Promise<ResponseModel>;
}
