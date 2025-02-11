import { SubscribeDto } from './user/dto/subscribe.dto';
export declare class SubscriberService {
    subscribe(payload: SubscribeDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getSubscriberListByFilterPaginate(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
}
