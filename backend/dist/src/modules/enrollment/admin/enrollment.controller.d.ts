import { EnrollmentService } from '../enrollment.service';
export declare class EnrollmentAdminController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    getCourseTransactionReport(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
