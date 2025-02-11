import { ResponseModel } from 'src/shared/models/response.model';
import { ReviewService } from '../review/review.service';
export declare class PublicService {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getAllLanguageList(): Promise<ResponseModel>;
    commonSettings(): Promise<ResponseModel>;
    getLandingPageData(): Promise<ResponseModel>;
    getInstructorProfileDetails(user_name: string): Promise<ResponseModel>;
    getInstructors(): Promise<ResponseModel>;
    getTermsConditionData(): Promise<ResponseModel>;
    getPrivacyPolicyData(): Promise<ResponseModel>;
}
