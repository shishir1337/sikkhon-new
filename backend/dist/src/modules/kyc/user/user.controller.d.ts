import { KycService } from '../kyc.service';
import { User } from '@prisma/client';
import { SubmitKycDto } from './dto/submit-kyc.dto';
export declare class UserController {
    private readonly kycService;
    constructor(kycService: KycService);
    getUserKycVerificationList(user: User): Promise<import("../../../shared/models/response.model").ResponseModel>;
    submitKyc(user: User, payload: SubmitKycDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    checkKycValidation(user: User): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
