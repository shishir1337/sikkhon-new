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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicBlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("../blog.service");
const public_decorator_1 = require("../../../shared/decorators/public.decorator");
const user_decorators_1 = require("../../../shared/decorators/user.decorators");
const client_1 = require("@prisma/client");
let PublicBlogController = class PublicBlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    getBlogCategoryList(payload) {
        return this.blogService.getBlogListByPaginateAndSearchPublic(payload);
    }
    getCategoryList() {
        return this.blogService.getCategoryListPublic();
    }
    getBlogDetails(blog_slug) {
        return this.blogService.getBlogDetailsBySlugPublic(blog_slug);
    }
    addBlogComment(user, payload) {
        return this.blogService.addBlogComment(user, payload);
    }
    getBlogComments(blog_id) {
        return this.blogService.getBlogComments(blog_id);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('blog-list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PublicBlogController.prototype, "getBlogCategoryList", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('get-category-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicBlogController.prototype, "getCategoryList", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('blog-details-:blog_slug'),
    __param(0, (0, common_1.Param)('blog_slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicBlogController.prototype, "getBlogDetails", null);
__decorate([
    (0, common_1.Post)('add-blog-comment'),
    __param(0, (0, user_decorators_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", void 0)
], PublicBlogController.prototype, "addBlogComment", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('get-blog-comments/:blog_id'),
    __param(0, (0, common_1.Param)('blog_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicBlogController.prototype, "getBlogComments", null);
PublicBlogController = __decorate([
    (0, common_1.Controller)('public'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], PublicBlogController);
exports.PublicBlogController = PublicBlogController;
//# sourceMappingURL=public-blog.controller.js.map