import { PrismaService } from '../prisma/prisma.service';
export declare class UserVerificationCodeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUserCode(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    verifyUserCode(user_id: number, code: string, type: number): Promise<import("../../shared/models/response.model").ResponseModel>;
}
