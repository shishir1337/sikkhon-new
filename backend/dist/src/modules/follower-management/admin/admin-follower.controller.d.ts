import { FollowerService } from '../follower.service';
export declare class AdminFollowerController {
    private readonly followerService;
    constructor(followerService: FollowerService);
    getInstructorFollowerList(id: number, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
