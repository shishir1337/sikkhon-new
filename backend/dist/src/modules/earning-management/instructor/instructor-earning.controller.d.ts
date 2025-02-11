import { EarningService } from '../earning.service';
import { User } from '@prisma/client';
import { PaymentWithdrawRequestDto } from './dto/payment-withdraw-request.dto';
import { WithdrawAdminFeeDto } from './dto/withdraw-admin-fee.dto';
export declare class InstructorEarningController {
    private readonly earningService;
    constructor(earningService: EarningService);
    paymentWithdrawRequest(user: User, payload: PaymentWithdrawRequestDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getWithdrawList(user: User, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getWithdrawAdminFee(user: User, payload: WithdrawAdminFeeDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getInstructorSelfEarningDetails(user: User, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
