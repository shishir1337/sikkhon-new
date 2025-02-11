"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogAdminController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("../blog.service");
const store_blog_dto_1 = require("./dto/store-blog.dto");
const store_blog_category_dto_1 = require("./dto/store-blog-category.dto");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
const client_1 = require("@prisma/client");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const store_blog_tag_dto_1 = require("./dto/store-blog-tag.dto");
let BlogAdminController = class BlogAdminController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    addBlogCategory(payload) {
        return this.blogService.addBlogCategory(payload);
    }
    getBlogCategory(payload) {
        return this.blogService.getBlogCategoryByPaginateSearch(payload);
    }
    updateBlogCategory(blog_category_id, payload) {
        return this.blogService.updateBlogCategory(blog_category_id, payload);
    }
    getBlogCategoryDetails(blog_category_id) {
        return this.blogService.getBlogCategoryDetails(blog_category_id);
    }
    deleteBlogCategory(blog_category_id) {
        return this.blogService.deleteBlogCategory(blog_category_id);
    }
    createNewBlog(user, payload) {
        return this.blogService.createNewBlog(user, payload);
    }
    getBlogPendingComments(payload) {
        return this.blogService.getBlogPendingComments(payload);
    }
    approveBlogComment(payload) {
        return this.blogService.approveBlogComment(payload);
    }
    deleteBlogComment(blog_comment_id) {
        return this.blogService.deleteBlogComment(blog_comment_id);
    }
    getBlogList(payload) {
        return this.blogService.getBlogListByPaginateAndSearch(payload);
    }
    updateBlogPost(user, blog_id, payload) {
        return this.blogService.updateBlogPost(user, blog_id, payload);
    }
    getBlogPostDetails(blog_id) {
        return this.blogService.getBlogPostDetails(blog_id);
    }
    deleteBlogPost(blog_id) {
        return this.blogService.deleteBlogPost(blog_id);
    }
    addBlogTag(payload) {
        return this.blogService.addBlogTag(payload);
    }
    getBlogTagList(payload) {
        return this.blogService.getBlogTagListByPaginateSearch(payload);
    }
    updateBlogTag(blog_tag_id, payload) {
        return this.blogService.updateBlogTag(blog_tag_id, payload);
    }
    getBlogTagDetails(blog_tag_id) {
        return this.blogService.getBlogTagDetails(blog_tag_id);
    }
    deleteBlogTagDetails(blog_tag_id) {
        return this.blogService.deleteBlogTagDetails(blog_tag_id);
    }
    getAllBlogCategory() {
        return this.blogService.getAllActiveBlogCategory();
    }
    getAllBlogTag() {
        return this.blogService.getAllActiveBlogTag();
    }
};
__decorate([
    (0, common_1.Post)('add-blog-category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_blog_category_dto_1.StoreBlogCategoryDto]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "addBlogCategory", null);
__decorate([
    (0, common_1.Get)('get-blog-category'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "getBlogCategory", null);
__decorate([
    (0, common_1.Put)('update-blog-category-:blog_category_id'),
    __param(0, (0, common_1.Param)('blog_category_id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, store_blog_category_dto_1.StoreBlogCategoryDto]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "updateBlogCategory", null);
__decorate([
    (0, common_1.Get)('blog-category-details-:blog_category_id'),
    __param(0, (0, common_1.Param)('blog_category_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "getBlogCategoryDetails", null);
__decorate([
    (0, common_1.Delete)('delete-blog-category-:blog_category_id'),
    __param(0, (0, common_1.Param)('blog_category_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "deleteBlogCategory", null);
__decorate([
    (0, common_1.Post)('create-new-blog'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object, store_blog_dto_1.StoreBlogDto]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "createNewBlog", null);
__decorate([
    (0, common_1.Get)('get-blog-pending-comments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "getBlogPendingComments", null);
__decorate([
    (0, common_1.Post)('approve-blog-comment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "approveBlogComment", null);
__decorate([
    (0, common_1.Delete)('delete-blog-comment-:blog_comment_id'),
    __param(0, (0, common_1.Param)('blog_comment_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "deleteBlogComment", null);
__decorate([
    (0, common_1.Get)('get-blog-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "getBlogList", null);
__decorate([
    (0, common_1.Put)('update-blog-post-:blog_id'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Param)('blog_id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object, Number, store_blog_dto_1.StoreBlogDto]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "updateBlogPost", null);
__decorate([
    (0, common_1.Get)('get-blog-post-details-:blog_id'),
    __param(0, (0, common_1.Param)('blog_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "getBlogPostDetails", null);
__decorate([
    (0, common_1.Delete)('delete-blog-post-:blog_id'),
    __param(0, (0, common_1.Param)('blog_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "deleteBlogPost", null);
__decorate([
    (0, common_1.Post)('add-blog-tag'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_blog_tag_dto_1.StoreBlogTagDto]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "addBlogTag", null);
__decorate([
    (0, common_1.Get)('blog-tag-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "getBlogTagList", null);
__decorate([
    (0, common_1.Put)('update-blog-tag-:blog_tag_id'),
    __param(0, (0, common_1.Param)('blog_tag_id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, store_blog_tag_dto_1.StoreBlogTagDto]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "updateBlogTag", null);
__decorate([
    (0, common_1.Get)('get-blog-tag-:blog_tag_id'),
    __param(0, (0, common_1.Param)('blog_tag_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "getBlogTagDetails", null);
__decorate([
    (0, common_1.Delete)('delete-blog-tag-:blog_tag_id'),
    __param(0, (0, common_1.Param)('blog_tag_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "deleteBlogTagDetails", null);
__decorate([
    (0, common_1.Get)('all-blog-category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "getAllBlogCategory", null);
__decorate([
    (0, common_1.Get)('all-blog-tag'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogAdminController.prototype, "getAllBlogTag", null);
BlogAdminController = __decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogAdminController);
exports.BlogAdminController = BlogAdminController;
//# sourceMappingURL=admin-blog.controller.js.map