import { User } from "@prisma/client";
export declare class LoginResponse {
    success: Boolean;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        user: User;
    };
}
