import { NotificationService } from '../notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';
export declare class AdminNotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sendNotification(payload: SendNotificationDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
