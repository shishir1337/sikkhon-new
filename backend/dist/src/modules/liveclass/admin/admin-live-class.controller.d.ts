import { AgoraTokenService } from '../class.service';
export declare class AdminLiveClassController {
    private readonly AgoraTokenService;
    constructor(AgoraTokenService: AgoraTokenService);
    createLiveClass(): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
