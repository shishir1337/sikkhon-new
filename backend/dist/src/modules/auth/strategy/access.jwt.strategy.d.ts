import { Strategy } from 'passport-jwt';
import { AccessTokenPayload } from 'src/modules/auth/types/access-token-payload';
import { User } from '@prisma/client';
import { UsersService } from 'src/modules/users/user/users.service';
declare const AccessJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessJwtStrategy extends AccessJwtStrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(payload: AccessTokenPayload): Promise<User>;
}
export {};
