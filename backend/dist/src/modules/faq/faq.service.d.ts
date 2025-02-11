import { AddNewFaqDto } from './admin/dto/add-new-faq.dto';
export declare class FaqService {
    addNewFaq(payload: AddNewFaqDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getFaqListByFilterByPaginate(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getFaqDetails(id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateFaq(id: number, payload: AddNewFaqDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    deleteFaq(id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
}
