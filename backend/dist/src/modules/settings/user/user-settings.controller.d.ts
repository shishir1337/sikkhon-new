import { SettingsService } from '../settings.service';
import { User } from '@prisma/client';
export declare class UserSettingsController {
    private readonly settingService;
    constructor(settingService: SettingsService);
    updateInstructorSettings(user: User, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
