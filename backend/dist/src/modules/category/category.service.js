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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const response_model_1 = require("../../shared/models/response.model");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
const types_1 = require("../../shared/constants/types");
let CategoryService = class CategoryService {
    constructor() { }
    async getAllCategories(payload) {
        try {
            const search = payload.search ? payload.search : '';
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        slug: {
                            contains: search,
                        },
                    },
                ],
            };
            const allCategories = await functions_1.PrismaClient.category.findMany(Object.assign({ where: whereCondition }, paginate));
            const paginationMeta = await (0, functions_1.paginationMetaData)('category', payload, whereCondition);
            const data = {
                list: allCategories,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Response Successfully', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getAllActiveCategoriesPublic() {
        try {
            const allCategories = await functions_1.PrismaClient.category.findMany({
                where: { status: coreConstant_1.coreConstant.ACTIVE },
                include: {
                    SubCategory: true,
                },
            });
            return (0, functions_1.successResponse)('Response Successfully', allCategories);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getAllActiveCategories(payload) {
        try {
            const search = payload.search ? payload.search : '';
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        slug: {
                            contains: search,
                        },
                    },
                ],
            };
            const allCategories = await functions_1.PrismaClient.category.findMany(Object.assign({ where: Object.assign(Object.assign({}, whereCondition), { status: coreConstant_1.coreConstant.ACTIVE }) }, paginate));
            const paginationMeta = await (0, functions_1.paginationMetaData)('category', payload, whereCondition);
            const data = {
                list: allCategories,
                meta: paginationMeta,
            };
            return (0, functions_1.successResponse)('Response Successfull', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getCategoryDetails(id) {
        try {
            const category = await functions_1.PrismaClient.category.findUnique({
                where: {
                    id: id,
                },
            });
            if (!category) {
                return (0, functions_1.errorResponse)('Category not found');
            }
            return (0, functions_1.successResponse)('Response Successfull', category);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async createCategory(payload) {
        try {
            const slug = await (0, functions_1.createSlug)(payload.name);
            const Category = await functions_1.PrismaClient.category.create({
                data: {
                    name: payload.name,
                    slug: slug,
                    logo: payload.logo,
                    status: payload.status === coreConstant_1.coreConstant.ACTIVE
                        ? coreConstant_1.coreConstant.ACTIVE
                        : coreConstant_1.coreConstant.INACTIVE,
                },
            });
            if (Category) {
                return (0, functions_1.successResponse)('Created Successfully', Category);
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateCategory(payload) {
        try {
            const Category = await functions_1.PrismaClient.category.update({
                where: {
                    id: payload.id,
                },
                data: {
                    name: payload.name,
                    logo: payload.logo,
                    status: payload.status === coreConstant_1.coreConstant.ACTIVE
                        ? coreConstant_1.coreConstant.ACTIVE
                        : coreConstant_1.coreConstant.INACTIVE,
                },
            });
            if (Category) {
                return (0, functions_1.successResponse)('Updated Successfully', Category);
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteCategory(categoryId) {
        try {
            const existsCategory = await functions_1.PrismaClient.category.findFirst({
                where: {
                    id: categoryId,
                },
                include: {
                    SubCategory: true,
                    Course: true,
                },
            });
            if (!existsCategory) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            if (existsCategory.SubCategory.length > 0) {
                return (0, functions_1.errorResponse)('Please, remove subcategory under this category first!');
            }
            if (existsCategory.Course.length > 0) {
                return (0, functions_1.errorResponse)('Please, remove Course under this category first!');
            }
            await functions_1.PrismaClient.category.delete({
                where: {
                    id: categoryId,
                },
            });
            return (0, functions_1.successResponse)('Deleted Successfully');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getAllSubcategories(payload) {
        try {
            const search = payload.search ? payload.search : '';
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const whereCondition = {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        slug: {
                            contains: search,
                        },
                    },
                ],
            };
            const Subcategories = await functions_1.PrismaClient.subCategory.findMany(Object.assign({ where: whereCondition, include: {
                    category: {
                        select: {
                            name: true,
                        },
                    },
                } }, paginate));
            if (Subcategories) {
                const paginationMeta = await (0, functions_1.paginationMetaData)('subCategory', payload, whereCondition);
                const data = {
                    list: Subcategories,
                    meta: paginationMeta,
                };
                return (0, functions_1.successResponse)('Sub Categories Get Successfully', data);
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getSubCategoryDetails(id) {
        try {
            const Subcategory = await functions_1.PrismaClient.subCategory.findUnique({
                where: {
                    id: id,
                },
                include: {
                    category: true,
                },
            });
            if (!Subcategory) {
                return (0, functions_1.errorResponse)('Sub Category Not Found');
            }
            return (0, functions_1.successResponse)('Sub Category Get Successfully', Subcategory);
        }
        catch (error) { }
    }
    async createSubcategory(payload) {
        try {
            const slug = await (0, functions_1.createSlug)(payload.name);
            const Subcategory = await functions_1.PrismaClient.subCategory.create({
                data: {
                    name: payload.name,
                    logo: payload.logo,
                    slug: slug,
                    status: payload.status === coreConstant_1.coreConstant.ACTIVE
                        ? coreConstant_1.coreConstant.ACTIVE
                        : coreConstant_1.coreConstant.INACTIVE,
                    category_id: payload.category_id,
                },
            });
            if (Subcategory) {
                return (0, functions_1.successResponse)('Sub Category Created Successfully', Subcategory);
            }
            return (0, functions_1.errorResponse)('Sub Category Not Created');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async updateSubcategory(payload) {
        try {
            const Subcategory = await functions_1.PrismaClient.subCategory.update({
                where: {
                    id: payload.id,
                },
                data: {
                    name: payload.name,
                    logo: payload.logo,
                    status: payload.status === coreConstant_1.coreConstant.ACTIVE
                        ? coreConstant_1.coreConstant.ACTIVE
                        : coreConstant_1.coreConstant.INACTIVE,
                    category_id: payload.category_id,
                },
            });
            console.log(Subcategory, 'Subcategory');
            if (Subcategory) {
                return (0, functions_1.successResponse)('Sub Category Updated Successfully', Subcategory);
            }
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async deleteSubcategory(id) {
        try {
            const existsSubcategory = await functions_1.PrismaClient.subCategory.findFirst({
                where: {
                    id: id,
                },
                include: {
                    Course: true,
                },
            });
            if (!existsSubcategory) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            if (existsSubcategory.Course.length > 0) {
                return (0, functions_1.errorResponse)('Please, remove Courses under this sub-category first!');
            }
            const Subcategory = await functions_1.PrismaClient.subCategory.delete({
                where: {
                    id: id,
                },
            });
            if (Subcategory) {
                return (0, functions_1.successResponse)('Sub Category Deleted Successfully', Subcategory);
            }
            return (0, functions_1.errorResponse)('Sub Category Not Deleted');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map