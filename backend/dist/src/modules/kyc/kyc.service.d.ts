import { AddNewKycDto } from './admin/dto/add-new-kyc.dto';
import { User } from '@prisma/client';
import { SubmitKycDto } from './user/dto/submit-kyc.dto';
import { VerifyUserKycDto } from './admin/dto/verify-user-kyc.dto';
export declare class KycService {
    constructor();
    addNewKyc(payload: AddNewKycDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateKyc(id: number, payload: AddNewKycDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getKycListAdmin(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getKycDetails(id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    deleteKyc(id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    checkKycValidation(user: User): Promise<import("../../shared/models/response.model").ResponseModel>;
    getUserKycVerificationList(user: User): Promise<import("../../shared/models/response.model").ResponseModel>;
    submitKyc(user: User, payload: SubmitKycDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getUserKycList(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    verifyUserKyc(payload: VerifyUserKycDto): Promise<import("../../shared/models/response.model").ResponseModel>;
}
