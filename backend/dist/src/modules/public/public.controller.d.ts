import { PublicService } from './public.service';
import { ResponseModel } from 'src/shared/models/response.model';
export declare class PublicController {
    private readonly publicService;
    constructor(publicService: PublicService);
    getAllLanguageList(): Promise<ResponseModel>;
    commonSettings(): Promise<ResponseModel>;
    getLandingPageData(): Promise<ResponseModel>;
    getInstructorProfileDetails(user_name: string): Promise<ResponseModel>;
    getInstructors(): Promise<ResponseModel>;
    getTermsConditionData(): Promise<ResponseModel>;
    getPrivacyPolicyData(): Promise<ResponseModel>;
}
