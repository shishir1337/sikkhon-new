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
exports.UserCategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../category.service");
const types_1 = require("../../../shared/constants/types");
let UserCategoryController = class UserCategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getAllCategory() {
        return this.categoryService.getAllActiveCategoriesPublic();
    }
};
__decorate([
    (0, common_1.Get)('get-all-category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserCategoryController.prototype, "getAllCategory", null);
UserCategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], UserCategoryController);
exports.UserCategoryController = UserCategoryController;
//# sourceMappingURL=user-category.controller.js.map