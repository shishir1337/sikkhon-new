import { SettingsService } from '../settings.service';
export declare class PublicSettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getLlandingPageData(): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
