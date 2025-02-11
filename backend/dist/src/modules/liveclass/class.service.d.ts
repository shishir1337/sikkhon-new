import { ResponseModel } from 'src/shared/models/response.model';
export declare class AgoraTokenService {
    constructor();
    generateAccessToken(channelName: string, uid: string): Promise<ResponseModel>;
}
