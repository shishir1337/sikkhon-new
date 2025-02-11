import { User } from '../users/entities/user.entity';
import { MakeFollowerDto } from './user/dto/make-follower.dto';
export declare class FollowerService {
    makeFollower(user: User, payload: MakeFollowerDto): Promise<import("../../shared/models/response.model").ResponseModel>;
    getInstructorFollowerList(id: number, payload?: any): Promise<import("../../shared/models/response.model").ResponseModel>;
}
