import { User } from '../users/entities/user.entity';
import { PaymentWithdrawRequestDto } from './instructor/dto/payment-withdraw-request.dto';
import { WithdrawStatusUpdatedDto } from './admin/dto/withdraw-status-updated.dto';
import { WithdrawAdminFeeDto } from './instructor/dto/withdraw-admin-fee.dto';
export declare class EarningService {
    paymentWithdrawRequest(user: User, payload: PaymentWithdrawRequestDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getWithdrawListForInstructor(user: User, payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getWithdrawEarningForAdmin(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateWithdrawRequest(payload: WithdrawStatusUpdatedDto, file: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getWithdrawAdminFee(user: User, payload: WithdrawAdminFeeDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getInstructorSelfEarningDetails(user: User, payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getInstructorWalletList(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
}
