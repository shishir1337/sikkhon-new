import { SendNotificationDto } from './admin/dto/send-notification.dto';
import { User } from '../users/entities/user.entity';
export declare class NotificationService {
    sendNotificationToOneUser(user_id: number, title: string, body: string, redirect_url?: string): Promise<import("../../shared/models/response.model").ResponseModel>;
    sendNotificationToAllUser(userIdArray: number[], title: string, body: string, redirect_url?: string): Promise<import("../../shared/models/response.model").ResponseModel>;
    sendNotification(payload: SendNotificationDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getMyNotificationList(user: User, payload?: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getNotificationDetails(user: User, id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
}
