import { SubscriberService } from '../subscriber.service';
export declare class AdminSubscriberController {
    private readonly subscriberService;
    constructor(subscriberService: SubscriberService);
    getSubscriberList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
