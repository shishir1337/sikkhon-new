import { CertificateService } from '../certificate.service';
import { User } from '@prisma/client';
export declare class UserCertificateController {
    private readonly certificateService;
    constructor(certificateService: CertificateService);
    generateCertificate(user: User, course_id: number): Promise<any>;
}
