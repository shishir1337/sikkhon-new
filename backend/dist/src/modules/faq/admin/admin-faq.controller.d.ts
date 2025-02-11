import { FaqService } from '../faq.service';
import { AddNewFaqDto } from './dto/add-new-faq.dto';
export declare class FaqAdminController {
    private readonly faqService;
    constructor(faqService: FaqService);
    addNewFaq(payload: AddNewFaqDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getFaqList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getFaqDetails(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateFaq(id: number, payload: AddNewFaqDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteFaq(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
