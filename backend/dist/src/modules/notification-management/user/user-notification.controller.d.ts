import { NotificationService } from '../notification.service';
import { User } from 'src/modules/users/entities/user.entity';
export declare class UserNotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getMyNotificationList(user: User, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getNotificationDetails(user: User, id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
