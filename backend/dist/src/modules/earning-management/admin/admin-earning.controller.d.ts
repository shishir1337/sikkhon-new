import { EarningService } from '../earning.service';
import { WithdrawStatusUpdatedDto } from './dto/withdraw-status-updated.dto';
export declare class AdminEarningController {
    private readonly earningService;
    constructor(earningService: EarningService);
    getWithdrawEarningForAdmin(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateWithdrawRequest(file: Express.Multer.File, payload: WithdrawStatusUpdatedDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getInstructorWalletList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
