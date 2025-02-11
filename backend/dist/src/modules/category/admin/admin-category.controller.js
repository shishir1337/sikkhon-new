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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCategoryController = void 0;
const common_1 = require("@nestjs/common");
const is_admin_decorator_1 = require("../../../shared/decorators/is-admin.decorator");
const category_service_1 = require("../category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const update_subcategory_dto_1 = require("./dto/update-subcategory.dto ");
const create_subcategory_dto_1 = require("./dto/create-subcategory.dto");
const types_1 = require("../../../shared/constants/types");
let AdminCategoryController = class AdminCategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getAllCategory(payload) {
        return this.categoryService.getAllCategories(payload);
    }
    getAllActiveCategory(payload) {
        return this.categoryService.getAllActiveCategories(payload);
    }
    getCategoryDetails(id) {
        return this.categoryService.getCategoryDetails(id);
    }
    createCategory(payload) {
        return this.categoryService.createCategory(payload);
    }
    updateCategory(payload) {
        return this.categoryService.updateCategory(payload);
    }
    deleteCategory(id) {
        return this.categoryService.deleteCategory(id);
    }
    getAllSubCategory(payload) {
        return this.categoryService.getAllSubcategories(payload);
    }
    getSubCategoryDetails(id) {
        return this.categoryService.getSubCategoryDetails(id);
    }
    createSubCategory(payload) {
        return this.categoryService.createSubcategory(payload);
    }
    updateSubCategory(payload) {
        return this.categoryService.updateSubcategory(payload);
    }
    deleteSubCategory(id) {
        return this.categoryService.deleteSubcategory(id);
    }
};
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-all-category'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "getAllCategory", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-all-active-category'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "getAllActiveCategory", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-category-details/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "getCategoryDetails", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('create-category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "createCategory", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Patch)('update-category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "updateCategory", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Delete)('delete-category/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-all-sub-category'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "getAllSubCategory", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Get)('get-sub-category-details/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "getSubCategoryDetails", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Post)('create-sub-category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subcategory_dto_1.CreateSubcategoryDto]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "createSubCategory", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Patch)('update-sub-category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_subcategory_dto_1.updateSubcategoryDto]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "updateSubCategory", null);
__decorate([
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Delete)('delete-sub-category/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCategoryController.prototype, "deleteSubCategory", null);
AdminCategoryController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], AdminCategoryController);
exports.AdminCategoryController = AdminCategoryController;
//# sourceMappingURL=admin-category.controller.js.map