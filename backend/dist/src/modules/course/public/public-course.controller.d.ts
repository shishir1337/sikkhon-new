import { CourseService } from '../course.service';
export declare class PublicCourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getCourseListPublic(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getCourseFilterDataPublic(): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getCourseDetailsPublic(course_slug: string): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getCourseReviewDataPublic(course_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getCourseListBySearch(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
