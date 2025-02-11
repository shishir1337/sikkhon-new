import { User } from '../users/entities/user.entity';
export declare class CertificateService {
    private loadTemplate;
    private checkCertificateVerification;
    generateCertificate(user: User, course_id: number): Promise<any>;
}
