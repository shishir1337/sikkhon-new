import { User } from '@prisma/client';
export declare class UserResponse {
    success: Boolean;
    message: String;
    data: User;
}
