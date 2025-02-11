import { BlogService } from '../blog.service';
import { StoreBlogDto } from './dto/store-blog.dto';
import { StoreBlogCategoryDto } from './dto/store-blog-category.dto';
import { User } from '@prisma/client';
import { StoreBlogTagDto } from './dto/store-blog-tag.dto';
export declare class BlogAdminController {
    private readonly blogService;
    constructor(blogService: BlogService);
    addBlogCategory(payload: StoreBlogCategoryDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBlogCategory(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateBlogCategory(blog_category_id: number, payload: StoreBlogCategoryDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBlogCategoryDetails(blog_category_id: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteBlogCategory(blog_category_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    createNewBlog(user: User, payload: StoreBlogDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBlogPendingComments(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    approveBlogComment(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteBlogComment(blog_comment_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBlogList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateBlogPost(user: User, blog_id: number, payload: StoreBlogDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBlogPostDetails(blog_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteBlogPost(blog_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    addBlogTag(payload: StoreBlogTagDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBlogTagList(payload: any): Promise<import("../../../shared/models/response.model").ResponseModel>;
    updateBlogTag(blog_tag_id: number, payload: StoreBlogTagDto): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getBlogTagDetails(blog_tag_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    deleteBlogTagDetails(blog_tag_id: number): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getAllBlogCategory(): Promise<import("../../../shared/models/response.model").ResponseModel>;
    getAllBlogTag(): Promise<import("../../../shared/models/response.model").ResponseModel>;
}
