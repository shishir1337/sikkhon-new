"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let BlogService = class BlogService {
    async addBlogCategory(payload) {
        try {
            const checkUniqueCategory = await functions_1.PrismaClient.blogCategory.findFirst({
                where: {
                    name: payload.name,
                },
            });
            if (checkUniqueCategory) {
                return (0, functions_1.errorResponse)('This name has already taken!');
            }
            const blogCategory = await functions_1.PrismaClient.blogCategory.create({
                data: {
                    name: payload.name,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Blog is stored successfully!', blogCategory);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getBlogCategoryByPaginateSearch(payload) {
        try {
            const whereCondition = payload.search
                ? {
                    OR: [
                        {
                            name: {
                                contains: payload.search,
                            },
                        },
                    ],
                }
                : {};
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const faqList = await functions_1.PrismaClient.blogCategory.findMany(Object.assign({ where: whereCondition, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            const data = {
                list: faqList,
                meta: await (0, functions_1.paginationMetaData)('blogCategory', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Blog category list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateBlogCategory(blog_category_id, payload) {
        try {
            const checkUniqueCategory = await functions_1.PrismaClient.blogCategory.findFirst({
                where: {
                    name: payload.name,
                    NOT: {
                        id: blog_category_id,
                    },
                },
            });
            if (checkUniqueCategory) {
                return (0, functions_1.errorResponse)('This name has already taken!');
            }
            const existsBlogCategory = await functions_1.PrismaClient.blogCategory.findFirst({
                where: {
                    id: blog_category_id,
                },
            });
            if (!existsBlogCategory) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const updateBlogCategory = await functions_1.PrismaClient.blogCategory.update({
                where: {
                    id: existsBlogCategory.id,
                },
                data: {
                    name: payload.name,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Blog category is updated successfully!', updateBlogCategory);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getBlogCategoryDetails(blog_category_id) {
        try {
            const blogCategoryDetails = await functions_1.PrismaClient.blogCategory.findFirst({
                where: {
                    id: blog_category_id,
                },
            });
            if (!blogCategoryDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            return (0, functions_1.successResponse)('Blog category details', blogCategoryDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteBlogCategory(blog_category_id) {
        try {
            const blogCategoryDetails = await functions_1.PrismaClient.blogCategory.findFirst({
                where: {
                    id: blog_category_id,
                },
            });
            if (!blogCategoryDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            await functions_1.PrismaClient.blogCategory.delete({
                where: {
                    id: blogCategoryDetails.id,
                },
            });
            return (0, functions_1.successResponse)('Blog category is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async createNewBlog(user, payload) {
        try {
            const slug = await (0, functions_1.createUniqueSlug)(payload.title);
            console.log(slug, 'slugslug');
            const checkUniqueBlog = await functions_1.PrismaClient.blog.findFirst({
                where: {
                    slug: slug,
                },
            });
            if (checkUniqueBlog) {
                return (0, functions_1.errorResponse)('This title has already taken');
            }
            const thumbnail_link_path = payload.thumbnail_link
                ? await (0, functions_1.fetchMyUploadFilePathById)(payload.thumbnail_link)
                : null;
            const cover_image_link_path = payload.cover_image_link
                ? await (0, functions_1.fetchMyUploadFilePathById)(payload.cover_image_link)
                : null;
            const meta_img_path = payload.meta_img
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.meta_img)
                : null;
            const existsBlogCategory = await functions_1.PrismaClient.blogCategory.findFirst({
                where: {
                    id: payload.blog_category_id,
                },
            });
            if (!existsBlogCategory) {
                return (0, functions_1.errorResponse)('Invalid blog category');
            }
            const newBlog = await functions_1.PrismaClient.blog.create({
                data: {
                    title: payload.title,
                    slug: slug,
                    status: payload.status,
                    authorId: user.id,
                    blogCategoryId: payload.blog_category_id,
                    tag: payload.tag,
                    thumbnail_link: thumbnail_link_path,
                    cover_image_link: cover_image_link_path,
                    description: payload.description,
                    meta_title: payload.meta_title,
                    meta_keyword: payload.meta_keyword,
                    meta_description: payload.meta_description,
                    meta_img: meta_img_path,
                },
            });
            return (0, functions_1.successResponse)('New blog is created successfully!', newBlog);
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async getBlogPendingComments(payload) {
        try {
            const whereCondition = {
                status: coreConstant_1.coreConstant.STATUS_PENDING,
            };
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const blogComments = await functions_1.PrismaClient.blogComment.findMany(Object.assign({ where: whereCondition, include: {
                    Blog: true,
                    User: true,
                }, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            const data = {
                list: blogComments,
                meta: await (0, functions_1.paginationMetaData)('blogComment', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Blog comment list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async approveBlogComment(payload) {
        try {
            const blogComment = await functions_1.PrismaClient.blogComment.findUnique({
                where: {
                    id: Number(payload.blog_comment_id),
                },
            });
            if (!blogComment) {
                return (0, functions_1.errorResponse)('Invalid Blog comment id!');
            }
            const blogComments = await functions_1.PrismaClient.blogComment.update({
                where: {
                    id: Number(payload.blog_comment_id),
                },
                data: {
                    status: Number(payload.status) === coreConstant_1.coreConstant.STATUS_ACTIVE
                        ? coreConstant_1.coreConstant.STATUS_ACTIVE
                        : Number(payload.status) === coreConstant_1.coreConstant.STATUS_PENDING
                            ? coreConstant_1.coreConstant.STATUS_PENDING
                            : coreConstant_1.coreConstant.STATUS_REJECTED,
                },
            });
            return (0, functions_1.successResponse)('Blog comment is approved successfully!', blogComments);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteBlogComment(blog_comment_id) {
        try {
            const blogComment = await functions_1.PrismaClient.blogComment.findUnique({
                where: {
                    id: Number(blog_comment_id),
                },
            });
            if (!blogComment) {
                return (0, functions_1.errorResponse)('Invalid Blog comment id!');
            }
            const deletedBlog = await functions_1.PrismaClient.blogComment.delete({
                where: {
                    id: Number(blog_comment_id),
                },
            });
            if (!deletedBlog) {
                return (0, functions_1.errorResponse)('Comment is not deleted!');
            }
            return (0, functions_1.successResponse)('Blog comment is deleted successfully!');
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async getBlogListByPaginateAndSearch(payload) {
        try {
            const whereCondition = payload.search
                ? {
                    OR: [
                        {
                            title: {
                                contains: payload.search,
                            },
                        },
                    ],
                }
                : {};
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const blogList = await functions_1.PrismaClient.blog.findMany(Object.assign({ where: whereCondition, include: {
                    BlogCategory: true,
                }, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            blogList.map((blog) => {
                var _a, _b, _c;
                blog.cover_image_link = ((_a = blog.cover_image_link) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
                    ? blog.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(blog.cover_image_link);
                blog.meta_img = ((_b = blog.meta_img) === null || _b === void 0 ? void 0 : _b.startsWith('http'))
                    ? blog.meta_img
                    : (0, functions_1.addPhotoPrefix)(blog.meta_img);
                blog.thumbnail_link = ((_c = blog.thumbnail_link) === null || _c === void 0 ? void 0 : _c.startsWith('http'))
                    ? blog.thumbnail_link
                    : (0, functions_1.addPhotoPrefix)(blog.thumbnail_link);
            });
            const data = {
                list: blogList,
                meta: await (0, functions_1.paginationMetaData)('blog', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Blog list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateBlogPost(user, blog_id, payload) {
        try {
            const existsBlog = await functions_1.PrismaClient.blog.findFirst({
                where: {
                    id: blog_id,
                },
            });
            if (!existsBlog) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const slug = await (0, functions_1.createUniqueSlug)(payload.title);
            const checkUniqueBlog = await functions_1.PrismaClient.blog.findFirst({
                where: {
                    slug: slug,
                    NOT: {
                        id: existsBlog.id,
                    },
                },
            });
            if (checkUniqueBlog) {
                return (0, functions_1.errorResponse)('This title has already taken');
            }
            const thumbnail_link_path = payload.thumbnail_link
                ? await (0, functions_1.fetchMyUploadFilePathById)(payload.thumbnail_link)
                : existsBlog.thumbnail_link;
            const cover_image_link_path = payload.cover_image_link
                ? await (0, functions_1.fetchMyUploadFilePathById)(payload.cover_image_link)
                : existsBlog.cover_image_link;
            const meta_img_path = payload.meta_img
                ? await (0, functions_1.fetchMyUploadFilePathById)(undefined, payload.meta_img)
                : existsBlog.meta_img;
            const existsBlogCategory = await functions_1.PrismaClient.blogCategory.findFirst({
                where: {
                    id: payload.blog_category_id,
                },
            });
            if (!existsBlogCategory) {
                return (0, functions_1.errorResponse)('Invalid blog category');
            }
            const updateBlog = await functions_1.PrismaClient.blog.update({
                where: {
                    id: existsBlog.id,
                },
                data: {
                    title: payload.title,
                    slug: slug,
                    status: payload.status,
                    authorId: user.id,
                    blogCategoryId: payload.blog_category_id,
                    tag: payload.tag,
                    thumbnail_link: thumbnail_link_path,
                    cover_image_link: cover_image_link_path,
                    description: payload.description,
                    meta_title: payload.meta_title,
                    meta_keyword: payload.meta_keyword,
                    meta_description: payload.meta_description,
                    meta_img: meta_img_path,
                },
            });
            return (0, functions_1.successResponse)('Blog is updated successfully!', updateBlog);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getBlogPostDetails(blog_id) {
        try {
            const blogDetails = await functions_1.PrismaClient.blog.findFirst({
                where: {
                    id: blog_id,
                },
            });
            if (!blogDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            blogDetails.cover_image_link = blogDetails.cover_image_link.startsWith('http')
                ? blogDetails.cover_image_link
                : (0, functions_1.addPhotoPrefix)(blogDetails.cover_image_link);
            blogDetails.meta_img = blogDetails.meta_img.startsWith('http')
                ? blogDetails.meta_img
                : (0, functions_1.addPhotoPrefix)(blogDetails.meta_img);
            blogDetails.thumbnail_link = blogDetails.thumbnail_link.startsWith('http')
                ? blogDetails.thumbnail_link
                : (0, functions_1.addPhotoPrefix)(blogDetails.thumbnail_link);
            return (0, functions_1.successResponse)('Blog details', blogDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteBlogPost(blog_id) {
        try {
            const blogDetails = await functions_1.PrismaClient.blog.findFirst({
                where: {
                    id: blog_id,
                },
            });
            if (!blogDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            await functions_1.PrismaClient.blog.delete({
                where: {
                    id: blogDetails.id,
                },
            });
            return (0, functions_1.successResponse)('Blog is deleted successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async addBlogTag(payload) {
        try {
            const checkUniqueTag = await functions_1.PrismaClient.blogTag.findFirst({
                where: {
                    name: payload.name,
                },
            });
            if (checkUniqueTag) {
                return (0, functions_1.errorResponse)('This tag name has already taken!');
            }
            const blogTag = await functions_1.PrismaClient.blogTag.create({
                data: {
                    name: payload.name,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Blog tag is stored successfully!', blogTag);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getBlogTagListByPaginateSearch(payload) {
        try {
            const whereCondition = payload.search
                ? {
                    OR: [
                        {
                            name: {
                                contains: payload.search,
                            },
                        },
                    ],
                }
                : {};
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const blogTagList = await functions_1.PrismaClient.blogTag.findMany(Object.assign({ where: whereCondition, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            const data = {
                list: blogTagList,
                meta: await (0, functions_1.paginationMetaData)('blogTag', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Blog tag list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateBlogTag(blog_tag_id, payload) {
        try {
            const existsBlogTag = await functions_1.PrismaClient.blogTag.findFirst({
                where: {
                    id: blog_tag_id,
                },
            });
            if (!existsBlogTag) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const checkUniqueTag = await functions_1.PrismaClient.blogTag.findFirst({
                where: {
                    name: payload.name,
                    NOT: {
                        id: existsBlogTag.id,
                    },
                },
            });
            if (checkUniqueTag) {
                return (0, functions_1.errorResponse)('This tag name has already taken!');
            }
            const updateBlog = await functions_1.PrismaClient.blogTag.update({
                where: {
                    id: existsBlogTag.id,
                },
                data: {
                    name: payload.name,
                    status: payload.status,
                },
            });
            return (0, functions_1.successResponse)('Blog tag is updated successfully!', updateBlog);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getBlogTagDetails(blog_tag_id) {
        try {
            const blogTagDetails = await functions_1.PrismaClient.blogTag.findFirst({
                where: {
                    id: blog_tag_id,
                },
            });
            if (!blogTagDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            return (0, functions_1.successResponse)('Blog tag details', blogTagDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteBlogTagDetails(blog_tag_id) {
        try {
            const blogTagDetails = await functions_1.PrismaClient.blogTag.findFirst({
                where: {
                    id: blog_tag_id,
                },
            });
            if (!blogTagDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            await functions_1.PrismaClient.blogTag.delete({
                where: {
                    id: blogTagDetails.id,
                },
            });
            return (0, functions_1.successResponse)('Blog tag is deleted successfully');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getAllActiveBlogCategory() {
        try {
            const allBlogCategoryList = await functions_1.PrismaClient.blogCategory.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            return (0, functions_1.successResponse)('Active blog category list', allBlogCategoryList);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getAllActiveBlogTag() {
        try {
            const allBlogTagList = await functions_1.PrismaClient.blogTag.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            return (0, functions_1.successResponse)('Active blog tag list', allBlogTagList);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async addBlogComment(user, payload) {
        try {
            const findBlog = await functions_1.PrismaClient.blog.findUnique({
                where: {
                    id: payload.blogId,
                },
            });
            if (!findBlog)
                return (0, functions_1.errorResponse)('Blog id invalid');
            const newComment = await functions_1.PrismaClient.blogComment.create({
                data: {
                    message: payload.message,
                    status: coreConstant_1.coreConstant.STATUS_PENDING,
                    blog_id: Number(payload.blogId),
                    userId: user.id,
                },
            });
            return (0, functions_1.successResponse)('Comment added successfully!', newComment);
        }
        catch (error) {
            console.log(error, 'error');
            (0, functions_1.processException)(error);
        }
    }
    async getBlogListByPaginateAndSearchPublic(payload) {
        try {
            const whereCondition = Object.assign(Object.assign({ status: coreConstant_1.coreConstant.STATUS_ACTIVE }, (payload.search
                ? {
                    OR: [
                        {
                            title: {
                                contains: payload.search,
                            },
                        },
                    ],
                }
                : {})), (payload.blog_category_id
                ? { blogCategoryId: Number(payload.blog_category_id) }
                : {}));
            if (payload.tag) {
                whereCondition['tag'] = {
                    contains: payload.tag,
                };
            }
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const blogList = await functions_1.PrismaClient.blog.findMany(Object.assign({ where: whereCondition, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            blogList.map((blog) => {
                blog.cover_image_link = blog.cover_image_link.startsWith('http')
                    ? blog.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(blog.cover_image_link);
                blog.meta_img = blog.meta_img.startsWith('http')
                    ? blog.meta_img
                    : (0, functions_1.addPhotoPrefix)(blog.meta_img);
                blog.thumbnail_link = blog.thumbnail_link.startsWith('http')
                    ? blog.thumbnail_link
                    : (0, functions_1.addPhotoPrefix)(blog.thumbnail_link);
            });
            const data = {
                list: blogList,
                meta: await (0, functions_1.paginationMetaData)('blog', payload, whereCondition),
            };
            return (0, functions_1.successResponse)('Blog list public', data);
        }
        catch (error) {
            console.log(error, 'errorerror');
            (0, functions_1.processException)(error);
        }
    }
    async getCategoryListPublic() {
        try {
            const activeCategories = await functions_1.PrismaClient.blogCategory.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            return (0, functions_1.successResponse)('Active blog category list', activeCategories);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getBlogDetailsBySlugPublic(blog_slug) {
        try {
            const blogDetails = await functions_1.PrismaClient.blog.findFirst({
                where: {
                    slug: blog_slug,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                include: {
                    BlogCategory: true,
                    comments: {
                        where: {
                            status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                        },
                    },
                },
            });
            const activeCategories = await functions_1.PrismaClient.blogCategory.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            if (!blogDetails) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            blogDetails.cover_image_link = blogDetails.cover_image_link.startsWith('http')
                ? blogDetails.cover_image_link
                : (0, functions_1.addPhotoPrefix)(blogDetails.cover_image_link);
            blogDetails.meta_img = blogDetails.meta_img.startsWith('http')
                ? blogDetails.meta_img
                : (0, functions_1.addPhotoPrefix)(blogDetails.meta_img);
            blogDetails.thumbnail_link = blogDetails.thumbnail_link.startsWith('http')
                ? blogDetails.thumbnail_link
                : (0, functions_1.addPhotoPrefix)(blogDetails.thumbnail_link);
            blogDetails.categories = [];
            for (const category of activeCategories) {
                const blogsCountInCategory = await functions_1.PrismaClient.blog.count({
                    where: {
                        status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                        blogCategoryId: category.id,
                    },
                });
                const categoryWithCount = {
                    id: category.id,
                    name: category.name,
                    blogsCount: blogsCountInCategory,
                };
                blogDetails.categories.push(categoryWithCount);
            }
            const recentPosts = await functions_1.PrismaClient.blog.findMany({
                where: {
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                },
                orderBy: {
                    created_at: 'desc',
                },
                take: 5,
            });
            recentPosts.forEach((post) => {
                post.cover_image_link = post.cover_image_link.startsWith('http')
                    ? post.cover_image_link
                    : (0, functions_1.addPhotoPrefix)(post.cover_image_link);
                post.meta_img = post.meta_img.startsWith('http')
                    ? post.meta_img
                    : (0, functions_1.addPhotoPrefix)(post.meta_img);
                post.thumbnail_link = post.thumbnail_link.startsWith('http')
                    ? post.thumbnail_link
                    : (0, functions_1.addPhotoPrefix)(post.thumbnail_link);
            });
            blogDetails.recentPosts = recentPosts;
            return (0, functions_1.successResponse)('Blog details', blogDetails);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getBlogComments(blogId) {
        try {
            const blogComments = await functions_1.PrismaClient.blogComment.findMany({
                where: {
                    blog_id: Number(blogId),
                    status: { equals: 1 },
                },
                orderBy: {
                    created_at: 'asc',
                },
                include: {
                    User: true,
                },
            });
            blogComments.map((comment) => {
                comment.User.photo = (0, functions_1.addPhotoPrefix)(comment.User.photo);
                delete comment.User.password;
            });
            return (0, functions_1.successResponse)('Blog comments retrieved successfully!', blogComments);
        }
        catch (error) {
            (0, functions_1.processException)(error);
            return (0, functions_1.errorResponse)('Error retrieving blog comments');
        }
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)()
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map