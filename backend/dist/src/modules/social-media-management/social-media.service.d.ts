import { StoreSocialMediaDto } from "./admin/dto/store-social-media.dto";
export declare class SocialMediaService {
    createNewSocialMedia(payload: StoreSocialMediaDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getSocialMediaListForAdmin(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    getSocialMediaDetails(id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
    updateSocialMedia(social_media_id: number, payload: StoreSocialMediaDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    deleteSocialMedia(id: number): Promise<import("../../shared/models/response.model").ResponseModel>;
}
