import { SocialMediaService } from "../social-media.service";
import { StoreSocialMediaDto } from "./dto/store-social-media.dto";
export declare class AdminSocialMediaController {
    private readonly socialMediaService;
    constructor(socialMediaService: SocialMediaService);
    createNewSocialMedia(payload: StoreSocialMediaDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getSocialMediaList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getSocialMediaDetails(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateSocialMedia(social_media_id: number, payload: StoreSocialMediaDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteSocialMedia(id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
