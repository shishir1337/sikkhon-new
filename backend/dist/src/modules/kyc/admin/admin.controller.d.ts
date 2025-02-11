import { AddNewKycDto } from './dto/add-new-kyc.dto';
import { KycService } from '../kyc.service';
import { VerifyUserKycDto } from './dto/verify-user-kyc.dto';
export declare class AdminController {
    private readonly kycService;
    constructor(kycService: KycService);
    addNewKyc(payload: AddNewKycDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getKycListAdmin(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getKycDetails(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateKyc(id: number, payload: AddNewKycDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteKyc(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getUserKycList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    verifyUserKyc(payload: VerifyUserKycDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
