import { SubscribeDto } from './dto/subscribe.dto';
import { SubscriberService } from '../subscriber.service';
export declare class UserSubscriberController {
    private readonly subscriberService;
    constructor(subscriberService: SubscriberService);
    subscribe(payload: SubscribeDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
