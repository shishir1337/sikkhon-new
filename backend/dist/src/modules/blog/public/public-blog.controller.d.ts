import { BlogService } from '../blog.service';
import { User } from '@prisma/client';
export declare class PublicBlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    getBlogCategoryList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getCategoryList(): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBlogDetails(blog_slug: string): Promise<import("../../../shared/models/response.model").ResponseModel>;
    addBlogComment(user: User, payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBlogComments(blog_id: string): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
