import { User } from "@prisma/client";
export declare class SignupResponse {
    success: Boolean;
    message: String;
    data: User;
}
