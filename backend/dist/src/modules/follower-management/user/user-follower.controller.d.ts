import { FollowerService } from '../follower.service';
import { MakeFollowerDto } from './dto/make-follower.dto';
import { User } from 'src/modules/users/entities/user.entity';
export declare class UserFollowerController {
    private readonly followerService;
    constructor(followerService: FollowerService);
    makeFollower(user: User, payload: MakeFollowerDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
